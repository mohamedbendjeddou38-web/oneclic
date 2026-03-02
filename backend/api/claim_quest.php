<?php
require __DIR__ . '/config.php';
require __DIR__ . '/game_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    envoyerJson(['error' => 'Method not allowed'], 405);
}

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
$questId = $entree['questId'] ?? null;
if (!$questId) {
    envoyerJson(['error' => 'questId manquant'], 400);
}
$quest = null;
foreach ($QUESTS as $q) {
    if ($q['id'] === $questId) {
        $quest = $q;
        break;
    }
}
if (!$quest) {
    envoyerJson(['error' => 'Quête inconnue'], 400);
}
$refUtilisateur = $database->getReference('users/' . $uid);
$snapshot = $refUtilisateur->getSnapshot();
if (!$snapshot->exists()) {
    envoyerJson(['error' => 'Utilisateur introuvable'], 404);
}
$etat = $snapshot->getValue();

$totalGold = floatval($etat['totalGold'] ?? 0);
$gold = floatval($etat['gold'] ?? 0);
$inventaire = (array) ($etat['inventory'] ?? []);
$cosmetiques = (array) ($etat['unlockedCosmetics'] ?? ['skin_default', 'bg_default']);
$completedQuests = (array) ($etat['completedQuests'] ?? []);
$ancientCoins = floatval($etat['ancientCoins'] ?? 0);
if (in_array($questId, $completedQuests)) {
    envoyerJson(['error' => 'Quête déjà réclamée'], 400);
}

if (!verifierQuete($quest, $totalGold, $inventaire, $cosmetiques)) {
    envoyerJson(['error' => 'Condition de quête non remplie'], 403);
}
$ancientCoins += $quest['rewardPA'];
$completedQuests[] = $questId;

try {
    $refUtilisateur->update([
        'ancientCoins' => $ancientCoins,
        'completedQuests' => $completedQuests,
        'lastSync' => time(),
    ]);
} catch (\Exception $e) {
    envoyerJson(['error' => 'Erreur de sauvegarde'], 500);
}

envoyerJson([
    'success' => true,
    'rewardPA' => $quest['rewardPA'],
    'newAncientCoins' => $ancientCoins,
    'completedQuests' => $completedQuests,
]);
?>