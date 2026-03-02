<?php
// backend/api/sync.php
ignore_user_abort(true);
set_time_limit(30);
require __DIR__ . '/config.php';
require __DIR__ . '/game_config.php';

function logSync($msg)
{
}

// Vérifi le token
$chaineJeton = obtenirJetonPorteur();

$rawInput = file_get_contents('php://input');
$entree = json_decode($rawInput, true);

if (!$chaineJeton && $entree && isset($entree['token'])) {
    $chaineJeton = $entree['token'];
}

if (!$chaineJeton) {
    envoyerJson(['error' => 'Non autorisé. Jeton manquant.'], 401);
}

try {
    $jetonIdVerifie = $auth->verifyIdToken($chaineJeton);
    $uid = $jetonIdVerifie->claims()->get('sub');
    $email = $jetonIdVerifie->claims()->get('email');
    $name = $jetonIdVerifie->claims()->get('name');
    if (!$name) {
        $name = $email ? explode('@', $email)[0] : 'Pirate_' . substr($uid, 0, 5);
    }
} catch (\Throwable $e) {
    envoyerJson(['error' => 'Jeton invalide : ' . $e->getMessage()], 401);
}

$refUtilisateur = $database->getReference('users/' . $uid);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $instantané = $refUtilisateur->getSnapshot();
    if ($instantané->exists()) {
        $etat = $instantané->getValue();
        if (!isset($etat['displayName']) || $etat['displayName'] !== $name) {
            $refUtilisateur->update(['displayName' => $name]);
            $etat['displayName'] = $name;
        }
        $etat['email'] = $email;
        envoyerJson(['state' => $etat]);
    } else {
        $initialState = [
            'displayName' => $name,
            'gold' => 0,
            'totalGold' => 0,
            'ancientCoins' => 0,
            'completedQuests' => [],
            'inventory' => [],
            'skills' => [],
            'unlockedCosmetics' => ['skin_default', 'bg_default'],
            'equipped' => ['skin' => 'default', 'bg' => 'default'],
            'lastSync' => time()
        ];
        $refUtilisateur->set($initialState);
        envoyerJson(['state' => $initialState]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $instantaneEtatActuel = $refUtilisateur->getSnapshot();
    $etatActuelUtilisateur = $instantaneEtatActuel->exists() ? $instantaneEtatActuel->getValue() : [];

    if (empty($etatActuelUtilisateur)) {
        $etatActuelUtilisateur = [
            'displayName' => $name,
            'totalGold' => 0,
            'gold' => 0,
            'lastSync' => 0,
        ];
    }
$dernierSync = isset($etatActuelUtilisateur['lastSync']) ? intval($etatActuelUtilisateur['lastSync']) : 0;
    $tempsDernierSync = time() - $dernierSync;

    $isImportantChange = false;
    if (isset($entree['fullState'])) {
        $newInv = $entree['fullState']['inventory'] ?? [];
        $oldInv = (array) ($etatActuelUtilisateur['inventory'] ?? []);
        $newCosm = $entree['fullState']['unlockedCosmetics'] ?? [];
        $oldCosm = (array) ($etatActuelUtilisateur['unlockedCosmetics'] ?? []);

        if ($newInv != $oldInv || $newCosm != $oldCosm) {
            $isImportantChange = true;
        }
    }

    if ($dernierSync > 0 && $tempsDernierSync < 4 && !$isImportantChange) {
        envoyerJson(['success' => true, 'message' => 'Sync ignorée (trop fréquente)']);
    }

    if (isset($entree['fullState'])) {
        $state = $entree['fullState'];
 $goldServeur = floatval($etatActuelUtilisateur['gold'] ?? 0);

        $inventaireServeur = (array) ($etatActuelUtilisateur['inventory'] ?? []);
        $gpsServeur = calculerGPS($inventaireServeur);
        $clickPowerServeur = calculerClickPowerMax($inventaireServeur);
        $MAX_CPS = 15;
        $MULT_SKILL_MAX = 500;
        $gainMaxParSeconde = $gpsServeur + ($clickPowerServeur * $MAX_CPS * $MULT_SKILL_MAX);

        $goldClient = floatval($state['gold'] ?? 0);

        if ($dernierSync > 0 && $gainMaxParSeconde > 0) {
            $gainMaxAutorise = $goldServeur + ($gainMaxParSeconde * $tempsDernierSync * 1.5);
            if ($goldClient > $gainMaxAutorise) {
                // Plafonner silencieusement au max autorisé
                logSync("ANTI-CHEAT: Gold plafonné pour $uid. Reçu: $goldClient, Max autorisé: $gainMaxAutorise");
                $state['gold'] = $gainMaxAutorise;
            }
        } elseif ($dernierSync > 0 && $gpsServeur === 0.0 && $clickPowerServeur <= 1.0) {
            $gainMaxBrut = 1 * $MAX_CPS * $MULT_SKILL_MAX * $tempsDernierSync * 1.5;
            if ($goldClient > $gainMaxBrut + $goldServeur) {
                $state['gold'] = $goldServeur + $gainMaxBrut;
            }
        }

        $misesAJour = ['lastSync' => time()];
        if (!isset($etatActuelUtilisateur['displayName']) || $etatActuelUtilisateur['displayName'] !== $name) {
            $misesAJour['displayName'] = $name;
        }

        if (isset($state['gold'])) {
            $misesAJour['gold'] = floatval($state['gold']);
        }

        if (isset($state['totalGold'])) {
            $clientTotalGold = floatval($state['totalGold']);
            $serverTotalGold = floatval($etatActuelUtilisateur['totalGold'] ?? 0);
            $totalGoldMax = $serverTotalGold + ($gainMaxParSeconde > 0 ? $gainMaxParSeconde * $tempsDernierSync * 1.5 : INF);
            $misesAJour['totalGold'] = min(max($clientTotalGold, $serverTotalGold), $totalGoldMax);
        }
if (isset($state['inventory']))
            $misesAJour['inventory'] = $state['inventory'];
        if (isset($state['unlockedCosmetics']))
            $misesAJour['unlockedCosmetics'] = $state['unlockedCosmetics'];
        if (isset($state['equipped']))
            $misesAJour['equipped'] = $state['equipped'];
        if (isset($state['skills']))
            $misesAJour['skills'] = $state['skills'];
        if (isset($state['ancientCoins']))
            $misesAJour['ancientCoins'] = floatval($state['ancientCoins']);
        try {
            $refUtilisateur->update($misesAJour);
            $database->getReference('leaderboard/lastUpdate')->set(0);
            envoyerJson(['success' => true, 'message' => 'État complet synchronisé']);
        } catch (\Exception $e) {
            envoyerJson(['error' => 'Erreur de sauvegarde'], 500);
        }

    } elseif (isset($entree['clicksAdded'])) {
        $clicsAjoutes = floatval($entree['clicksAdded']);
        $orActuel = floatval($etatActuelUtilisateur['gold'] ?? 0);
        $totalOrActuel = max(floatval($etatActuelUtilisateur['totalGold'] ?? 0), $orActuel);
        $nouvelOr = $orActuel + $clicsAjoutes;
        $nouveauTotalOr = $totalOrActuel + $clicsAjoutes;
        $misesAJour = [
            'gold' => $nouvelOr,
            'totalGold' => $nouveauTotalOr,
            'lastSync' => time()
        ];
        if (isset($entree['equipped']))
            $misesAJour['equipped'] = $entree['equipped'];
        try {
            $refUtilisateur->update($misesAJour);
            $database->getReference('leaderboard/lastUpdate')->set(0);
            envoyerJson(['success' => true, 'newGold' => $nouvelOr, 'newTotalGold' => $nouveauTotalOr]);
        } catch (\Exception $e) {
            envoyerJson(['error' => 'Erreur de sauvegarde'], 500);
        }
    } else {
        envoyerJson(['error' => 'Données invalides'], 400);
    }
} else {
    envoyerJson(['error' => 'Method not allowed'], 405);
}
?>