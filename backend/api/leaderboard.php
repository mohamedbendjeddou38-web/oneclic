<?php
require __DIR__ . '/config.php';

$chaineJeton = obtenirJetonPorteur();
$uid = null;
if ($chaineJeton) {
    try {
        $jetonIdVerifie = $auth->verifyIdToken($chaineJeton);
        $uid = $jetonIdVerifie->claims()->get('sub');
    } catch (\Exception $e) {
    }
}

$refLeaderboard = $database->getReference('leaderboard');
$lastUpdateRef = $refLeaderboard->getChild('lastUpdate');
$cacheRef = $refLeaderboard->getChild('cache');

$lastUpdate = $lastUpdateRef->getValue() ?: 0;
$currentTime = time();
$cacheExpire = 180;

if ($currentTime - $lastUpdate > $cacheExpire) {
    error_log("LEADERBOARD: Reconstruction du cache...");
    try {
        $usersSnap = $database->getReference('users')->getSnapshot();
        $usersData = $usersSnap->getValue();
        $leaderboard = [];

        if ($usersData && is_array($usersData)) {
            foreach ($usersData as $id => $data) {
                // On prend le maximum entre totalGold et gold actuel
                $g = isset($data['gold']) ? floatval($data['gold']) : 0;
                $tgStored = isset($data['totalGold']) ? floatval($data['totalGold']) : $g;
                $finalTg = max($g, $tgStored);

                if ($finalTg > 0) {
                    $leaderboard[] = [
                        'uid' => $id,
                        'name' => $data['displayName'] ?? 'Pirate Inconnu',
                        'totalGold' => $finalTg
                    ];
                }
            }
        }

        usort($leaderboard, function ($a, $b) {
            return $b['totalGold'] <=> $a['totalGold'];
        });

        $leaderboardResult = array_slice($leaderboard, 0, 100);
        $cacheRef->set($leaderboardResult);
        $lastUpdateRef->set($currentTime);
        $lastUpdatedTime = $currentTime;
        error_log("LEADERBOARD: Cache reconstruit avec " . count($leaderboardResult) . " joueurs.");
    } catch (\Exception $e) {
        error_log("LEADERBOARD ERROR: " . $e->getMessage());
        $leaderboardResult = $cacheRef->getValue() ?: [];
        $lastUpdatedTime = $lastUpdate;
    }
} else {
    $leaderboardResult = $cacheRef->getValue() ?: [];
    $lastUpdatedTime = $lastUpdate;
}
$userRank = null;
$userStats = null;

if ($uid) {
    foreach ($leaderboardResult as $index => $player) {
        if ($player['uid'] === $uid) {
            $userRank = $index + 1;
            $userStats = $player;
            break;
        }
    }

    if (!$userStats) {
        try {
            $userData = $database->getReference('users/' . $uid)->getValue();
            if ($userData) {
                $userStats = [
                    'uid' => $uid,
                    'name' => $userData['displayName'] ?? 'Vous',
                    'totalGold' => floatval($userData['totalGold'] ?? ($userData['gold'] ?? 0))
                ];
            }
        } catch (\Exception $e) {
            error_log("LEADERBOARD USER STATS ERROR: " . $e->getMessage());
        }
    }
}

$finalLeaderboard = [];
foreach ($leaderboardResult as $p) {
    unset($p['uid']);
    $finalLeaderboard[] = $p;
}

if ($userStats) {
    unset($userStats['uid']);
}

envoyerJson([
    'leaderboard' => $finalLeaderboard,
    'userRank' => $userRank,
    'userStats' => $userStats,
    'lastUpdate' => (int) $lastUpdatedTime,
    'nextUpdate' => (int) ($lastUpdatedTime + $cacheExpire)
]);
