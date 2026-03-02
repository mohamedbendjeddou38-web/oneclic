<?php

require __DIR__ . '/config.php';
require __DIR__ . '/game_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    envoyerJson(['error' => 'Method not allowed'], 405);
}

// --- Authentification ---
$chaineJeton = obtenirJetonPorteur();
$rawInput = file_get_contents('php://input');
$entree = json_decode($rawInput, true);

if (!$chaineJeton && isset($entree['token'])) {
    $chaineJeton = $entree['token'];
}
if (!$chaineJeton) {
    envoyerJson(['error' => 'Non autorisé. Jeton manquant.'], 401);
}

try {
    $jetonIdVerifie = $auth->verifyIdToken($chaineJeton);
    $uid = $jetonIdVerifie->claims()->get('sub');
} catch (\Throwable $e) {
    envoyerJson(['error' => 'Jeton invalide'], 401);
}

$boxId = $entree['boxId'] ?? null;
if (!$boxId || !isset($MYSTERY_BOXES[$boxId])) {
    envoyerJson(['error' => 'Coffre invalide'], 400);
}
$box = $MYSTERY_BOXES[$boxId];
$refUtilisateur = $database->getReference('users/' . $uid);
$snapshot = $refUtilisateur->getSnapshot();
if (!$snapshot->exists()) {
    envoyerJson(['error' => 'Utilisateur introuvable'], 404);
}
$etat = $snapshot->getValue();

$goldActuel = floatval($etat['gold'] ?? 0);
$totalGoldActuel = floatval($etat['totalGold'] ?? 0);
$inventaire = (array) ($etat['inventory'] ?? []);
$cosmetiquesDebloquees = (array) ($etat['unlockedCosmetics'] ?? ['skin_default', 'bg_default']);
if ($goldActuel < $box['cost']) {
    envoyerJson(['error' => 'Or insuffisant', 'gold' => $goldActuel, 'cost' => $box['cost']], 400);
}

$rates = $box['dropRates'];
$roll = mt_rand(0, 100000) / 1000.0;

$rarity = 'common';
$cumul = 0;
if ($roll < ($cumul += $rates['common'])) {
    $rarity = 'common';
} elseif ($roll < ($cumul += $rates['rare'])) {
    $rarity = 'rare';
} elseif ($roll < ($cumul += $rates['epic'])) {
    $rarity = 'epic';
} else {
    $rarity = 'legendary';
}

$poolSkins = array_filter($SKINS, function ($s) use ($rarity, $cosmetiquesDebloquees) {
    return $s['rarity'] === $rarity && !in_array('skin_' . $s['id'], $cosmetiquesDebloquees);
});
$poolBgs = array_filter($BACKGROUNDS, function ($b) use ($rarity, $cosmetiquesDebloquees) {
    return $b['rarity'] === $rarity && !in_array('bg_' . $b['id'], $cosmetiquesDebloquees);
});

$pool = [];
foreach ($poolSkins as $s) {
    $pool[] = ['type' => 'skin', 'id' => $s['id'], 'name' => $s['id']];
}
foreach ($poolBgs as $b) {
    $pool[] = ['type' => 'bg', 'id' => $b['id'], 'name' => $b['id']];
}

foreach ($AUTO_UPGRADES as $id => $cfg) {
    if (($cfg['rarity'] ?? 'common') === $rarity) {
        $pool[] = ['type' => 'upgrade', 'id' => $id];
    }
}

$rewardType = 'gold';
$rewardId = null;
$rewardGold = 0;
$rewardName = '';

if (!empty($pool)) {
    $item = $pool[array_rand($pool)];
    if ($item['type'] === 'upgrade') {
        $rewardType = 'upgrade';
        $rewardId = $item['id'];
        $rewardName = '+1 ' . $item['id'];
    } else {
        $rewardType = $item['type']; // 'skin' ou 'bg'
        $rewardId = $item['id'];
        $rewardName = $item['id'];
    }
} else {
    $rewardGold = intval($box['cost'] * (0.5 + (mt_rand(0, 1000) / 1000.0)));
    $rewardType = 'gold';
    $rewardName = $rewardGold . ' Or';
}

$nouveauGold = $goldActuel - $box['cost'] + $rewardGold;
$nouveauTotalGold = $totalGoldActuel + $rewardGold;

$misesAJour = [
    'gold' => $nouveauGold,
    'totalGold' => max($nouveauTotalGold, $nouveauGold),
    'lastSync' => time(),
];

if ($rewardType === 'upgrade') {
    $inventaire[$rewardId] = ($inventaire[$rewardId] ?? 0) + 1;
    $misesAJour['inventory'] = $inventaire;
} elseif ($rewardType === 'skin') {
    $cosmetiquesDebloquees[] = 'skin_' . $rewardId;
    $misesAJour['unlockedCosmetics'] = array_values(array_unique($cosmetiquesDebloquees));
} elseif ($rewardType === 'bg') {
    $cosmetiquesDebloquees[] = 'bg_' . $rewardId;
    $misesAJour['unlockedCosmetics'] = array_values(array_unique($cosmetiquesDebloquees));
}

try {
    $refUtilisateur->update($misesAJour);
    $database->getReference('leaderboard/lastUpdate')->set(0);
} catch (\Exception $e) {
    envoyerJson(['error' => 'Erreur de sauvegarde : ' . $e->getMessage()], 500);
}

envoyerJson([
    'success' => true,
    'reward' => [
        'type' => $rewardType,
        'value' => $rewardType === 'gold' ? $rewardGold : $rewardId,
        'name' => $rewardName,
        'rarity' => $rarity,
    ],
    'newGold' => $nouveauGold,
    'newTotalGold' => max($nouveauTotalGold, $nouveauGold),
    'newInventory' => $rewardType === 'upgrade' ? $inventaire : null,
    'newUnlockedCosmetics' => ($rewardType === 'skin' || $rewardType === 'bg') ? array_values(array_unique($cosmetiquesDebloquees)) : null,
]);
?>