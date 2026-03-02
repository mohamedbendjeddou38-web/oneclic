<?php
$AUTO_UPGRADES = [
    'auto_1' => ['basePower' => 0.1, 'baseCost' => 50, 'costMultiplier' => 1.5, 'rarity' => 'common'],
    'auto_2' => ['basePower' => 0.4, 'baseCost' => 1000, 'costMultiplier' => 1.4, 'rarity' => 'common'],
    'auto_3' => ['basePower' => 1.0, 'baseCost' => 10000, 'costMultiplier' => 1.4, 'rarity' => 'common'],
    'auto_4' => ['basePower' => 3.0, 'baseCost' => 50000, 'costMultiplier' => 1.4, 'rarity' => 'common'],
    'auto_5' => ['basePower' => 4.5, 'baseCost' => 120000, 'costMultiplier' => 1.4, 'rarity' => 'rare'],
    'auto_6' => ['basePower' => 7.0, 'baseCost' => 250000, 'costMultiplier' => 1.4, 'rarity' => 'rare'],
    'auto_7' => ['basePower' => 15.0, 'baseCost' => 400000, 'costMultiplier' => 1.3, 'rarity' => 'rare'],
    'auto_8' => ['basePower' => 35.0, 'baseCost' => 800000, 'costMultiplier' => 1.2, 'rarity' => 'epic'],
    'auto_9' => ['basePower' => 70.0, 'baseCost' => 1200000, 'costMultiplier' => 1.2, 'rarity' => 'epic'],
    'auto_10' => ['basePower' => 250.0, 'baseCost' => 6000000, 'costMultiplier' => 1.2, 'rarity' => 'epic'],
    'auto_11' => ['basePower' => 1500.0, 'baseCost' => 28000000, 'costMultiplier' => 1.2, 'rarity' => 'legendary'],
    'auto_12' => ['basePower' => 4000.0, 'baseCost' => 80000000, 'costMultiplier' => 1.1, 'rarity' => 'legendary'],
    'auto_13' => ['basePower' => 8000.0, 'baseCost' => 350000000, 'costMultiplier' => 1.1, 'rarity' => 'legendary'],
    'auto_14' => ['basePower' => 14000.0, 'baseCost' => 450000000, 'costMultiplier' => 1.09, 'rarity' => 'legendary'],
];
$CLICK_UPGRADES = [
    'card_canon' => ['baseCost' => 10, 'costMultiplier' => 2, 'currency' => 'pa'],
    'card_mat' => ['baseCost' => 15, 'costMultiplier' => 2, 'currency' => 'pa'],
    'card_sirene' => ['baseCost' => 20, 'costMultiplier' => 2, 'currency' => 'pa'],
    'card_voile' => ['baseCost' => 5, 'costMultiplier' => 2, 'currency' => 'pa'],
];
$MYSTERY_BOXES = [
    'box_common' => [
        'cost' => 5000000,
        'dropRates' => ['common' => 83, 'rare' => 15.7, 'epic' => 1.29, 'legendary' => 0.001],
    ],
    'box_rare' => [
        'cost' => 25000000,
        'dropRates' => ['common' => 65, 'rare' => 25, 'epic' => 9.9, 'legendary' => 0.01],
    ],
    'box_legendary' => [
        'cost' => 100000000,
        'dropRates' => ['common' => 55, 'rare' => 25, 'epic' => 20, 'legendary' => 0.1],
    ],
];
$SKINS = [
    ['id' => 'silver', 'rarity' => 'common', 'cost' => 25000],
    ['id' => 'ruby', 'rarity' => 'rare', 'cost' => 1000000],
    ['id' => 'emerald', 'rarity' => 'rare', 'cost' => 5000000],
    ['id' => 'sapphire', 'rarity' => 'epic', 'cost' => 25000000],
    ['id' => 'amethyst', 'rarity' => 'epic', 'cost' => 100000000],
    ['id' => 'bone', 'rarity' => 'epic', 'cost' => 5000, 'currency' => 'pa'],
    ['id' => 'obsidian', 'rarity' => 'legendary', 'cost' => 25000, 'currency' => 'pa'],
    ['id' => 'neon', 'rarity' => 'legendary', 'cost' => 0, 'priceLabel' => 'BOÎTE MYSTÈRE'],
    ['id' => 'void', 'rarity' => 'legendary', 'cost' => 0, 'priceLabel' => 'BOÎTE MYSTÈRE'],
    ['id' => 'diamond', 'rarity' => 'legendary', 'cost' => 500000000],
    ['id' => 'pearl', 'rarity' => 'legendary', 'cost' => 1500000000],
];

$BACKGROUNDS = [
    ['id' => 'sunset', 'rarity' => 'common', 'cost' => 10000],
    ['id' => 'toxic', 'rarity' => 'rare', 'cost' => 5000000],
    ['id' => 'retro_gb', 'rarity' => 'rare', 'cost' => 10000000],
    ['id' => 'blood_sea', 'rarity' => 'epic', 'cost' => 50000000],
    ['id' => 'cave', 'rarity' => 'epic', 'cost' => 250000000],
    ['id' => 'fog', 'rarity' => 'epic', 'cost' => 500000000],
    ['id' => 'galaxy', 'rarity' => 'legendary', 'cost' => 1000000000],
    ['id' => 'blueprint', 'rarity' => 'legendary', 'cost' => 5000, 'currency' => 'pa'],
    ['id' => 'gold_hoard', 'rarity' => 'legendary', 'cost' => 6000, 'currency' => 'pa'],
    ['id' => 'abyss', 'rarity' => 'legendary', 'cost' => 0, 'priceLabel' => 'BOÎTE MYSTÈRE'],
    ['id' => 'kraken_lair', 'rarity' => 'legendary', 'cost' => 0, 'priceLabel' => 'BOÎTE MYSTÈRE'],
];
$QUESTS = [
    ['id' => 'q_gold_1', 'rewardPA' => 5, 'type' => 'gold', 'param' => 100],
    ['id' => 'q_gold_2', 'rewardPA' => 20, 'type' => 'gold', 'param' => 1000],
    ['id' => 'q_gold_3', 'rewardPA' => 50, 'type' => 'gold', 'param' => 50000],
    ['id' => 'q_gold_4', 'rewardPA' => 50, 'type' => 'gold', 'param' => 500000],
    ['id' => 'q_gold_5', 'rewardPA' => 150, 'type' => 'gold', 'param' => 10000000],
    ['id' => 'q_gold_6', 'rewardPA' => 500, 'type' => 'gold', 'param' => 500000000],
    ['id' => 'q_gold_7', 'rewardPA' => 1000, 'type' => 'gold', 'param' => 1000000000],
    ['id' => 'q_gold_8', 'rewardPA' => 2500, 'type' => 'gold', 'param' => 50000000000],
    ['id' => 'q_gold_9', 'rewardPA' => 5000, 'type' => 'gold', 'param' => 250000000000],
    ['id' => 'q_gold_10', 'rewardPA' => 10000, 'type' => 'gold', 'param' => 1000000000000],

    ['id' => 'q_rat_1', 'rewardPA' => 10, 'type' => 'inventory', 'param' => ['id' => 'auto_1', 'min' => 2]],
    ['id' => 'q_rat_2', 'rewardPA' => 25, 'type' => 'inventory', 'param' => ['id' => 'auto_1', 'min' => 10]],
    ['id' => 'q_rat_4', 'rewardPA' => 50, 'type' => 'inventory', 'param' => ['id' => 'auto_1', 'min' => 30]],
    ['id' => 'q_rat_3', 'rewardPA' => 100, 'type' => 'inventory', 'param' => ['id' => 'auto_1', 'min' => 50]],
    ['id' => 'q_perroquet_1', 'rewardPA' => 5, 'type' => 'inventory', 'param' => ['id' => 'auto_2', 'min' => 1]],
    ['id' => 'q_perroquet_2', 'rewardPA' => 250, 'type' => 'inventory', 'param' => ['id' => 'auto_2', 'min' => 25]],
    ['id' => 'q_perroquet_3', 'rewardPA' => 1000, 'type' => 'inventory', 'param' => ['id' => 'auto_2', 'min' => 35]],
    ['id' => 'q_marin_1', 'rewardPA' => 10, 'type' => 'inventory', 'param' => ['id' => 'auto_3', 'min' => 1]],
    ['id' => 'q_marin_2', 'rewardPA' => 200, 'type' => 'inventory', 'param' => ['id' => 'auto_3', 'min' => 30]],
    ['id' => 'q_marin_3', 'rewardPA' => 3000, 'type' => 'inventory', 'param' => ['id' => 'auto_3', 'min' => 100]],
    ['id' => 'q_auto4_1', 'rewardPA' => 20, 'type' => 'inventory', 'param' => ['id' => 'auto_4', 'min' => 1]],
    ['id' => 'q_auto4_2', 'rewardPA' => 100, 'type' => 'inventory', 'param' => ['id' => 'auto_4', 'min' => 10]],
    ['id' => 'q_artilleur_2', 'rewardPA' => 200, 'type' => 'inventory', 'param' => ['id' => 'auto_4', 'min' => 25]],
    ['id' => 'q_artilleur_3', 'rewardPA' => 4000, 'type' => 'inventory', 'param' => ['id' => 'auto_4', 'min' => 75]],
    ['id' => 'q_auto6_1', 'rewardPA' => 25, 'type' => 'inventory', 'param' => ['id' => 'auto_6', 'min' => 1]],
    ['id' => 'q_quartier_maitre_2', 'rewardPA' => 300, 'type' => 'inventory', 'param' => ['id' => 'auto_6', 'min' => 15]],
    ['id' => 'q_quartier_maitre_3', 'rewardPA' => 6000, 'type' => 'inventory', 'param' => ['id' => 'auto_6', 'min' => 40]],
    ['id' => 'q_auto7_1', 'rewardPA' => 25, 'type' => 'inventory', 'param' => ['id' => 'auto_7', 'min' => 1]],
    ['id' => 'q_second_2', 'rewardPA' => 180, 'type' => 'inventory', 'param' => ['id' => 'auto_7', 'min' => 10]],
    ['id' => 'q_second_3', 'rewardPA' => 8000, 'type' => 'inventory', 'param' => ['id' => 'auto_7', 'min' => 60]],
    ['id' => 'q_auto8_1', 'rewardPA' => 80, 'type' => 'inventory', 'param' => ['id' => 'auto_8', 'min' => 1]],
    ['id' => 'q_auto8_2', 'rewardPA' => 200, 'type' => 'inventory', 'param' => ['id' => 'auto_8', 'min' => 5]],
    ['id' => 'q_navire_1', 'rewardPA' => 30, 'type' => 'inventory', 'param' => ['id' => 'auto_9', 'min' => 1]],
    ['id' => 'q_fantome_2', 'rewardPA' => 300, 'type' => 'inventory', 'param' => ['id' => 'auto_9', 'min' => 5]],
    ['id' => 'q_fantome_3', 'rewardPA' => 1200, 'type' => 'inventory', 'param' => ['id' => 'auto_9', 'min' => 15]],
    ['id' => 'q_auto10_1', 'rewardPA' => 300, 'type' => 'inventory', 'param' => ['id' => 'auto_10', 'min' => 1]],
    ['id' => 'q_kraken_2', 'rewardPA' => 600, 'type' => 'inventory', 'param' => ['id' => 'auto_10', 'min' => 3]],
    ['id' => 'q_kraken_3', 'rewardPA' => 2500, 'type' => 'inventory', 'param' => ['id' => 'auto_10', 'min' => 10]],
    ['id' => 'q_auto11_1', 'rewardPA' => 500, 'type' => 'inventory', 'param' => ['id' => 'auto_11', 'min' => 1]],
    ['id' => 'q_poseidon_2', 'rewardPA' => 1000, 'type' => 'inventory', 'param' => ['id' => 'auto_11', 'min' => 2]],
    ['id' => 'q_poseidon_3', 'rewardPA' => 5000, 'type' => 'inventory', 'param' => ['id' => 'auto_11', 'min' => 5]],
    ['id' => 'q_auto12_1', 'rewardPA' => 1000, 'type' => 'inventory', 'param' => ['id' => 'auto_12', 'min' => 1]],
    ['id' => 'q_atlantis_2', 'rewardPA' => 3000, 'type' => 'inventory', 'param' => ['id' => 'auto_12', 'min' => 5]],
    ['id' => 'q_auto14_1', 'rewardPA' => 5000, 'type' => 'inventory', 'param' => ['id' => 'auto_14', 'min' => 1]],

    ['id' => 'q_voile_1', 'rewardPA' => 200, 'type' => 'inventory', 'param' => ['id' => 'card_voile', 'min' => 5]],
    ['id' => 'q_canon_1', 'rewardPA' => 40, 'type' => 'inventory', 'param' => ['id' => 'card_canon', 'min' => 1]],
    ['id' => 'q_mat_1', 'rewardPA' => 25, 'type' => 'inventory', 'param' => ['id' => 'card_mat', 'min' => 1]],
    ['id' => 'q_sirene_1', 'rewardPA' => 50, 'type' => 'inventory', 'param' => ['id' => 'card_sirene', 'min' => 1]],
    ['id' => 'q_clicker_1', 'rewardPA' => 60, 'type' => 'inventory', 'param' => ['id' => 'card_canon', 'min' => 10]],
    ['id' => 'q_clicker_2', 'rewardPA' => 100, 'type' => 'inventory', 'param' => ['id' => 'card_voile', 'min' => 10]],
    ['id' => 'q_canon_2', 'rewardPA' => 2000, 'type' => 'inventory', 'param' => ['id' => 'card_canon', 'min' => 25]],
    ['id' => 'q_canon_3', 'rewardPA' => 10000, 'type' => 'inventory', 'param' => ['id' => 'card_canon', 'min' => 20]],
    ['id' => 'q_mat_2', 'rewardPA' => 1500, 'type' => 'inventory', 'param' => ['id' => 'card_mat', 'min' => 15]],
    ['id' => 'q_mat_3', 'rewardPA' => 10000, 'type' => 'inventory', 'param' => ['id' => 'card_mat', 'min' => 20]],
    ['id' => 'q_sirene_2', 'rewardPA' => 2000, 'type' => 'inventory', 'param' => ['id' => 'card_sirene', 'min' => 10]],
    ['id' => 'q_sirene_3', 'rewardPA' => 15000, 'type' => 'inventory', 'param' => ['id' => 'card_sirene', 'min' => 20]],
    ['id' => 'q_voile_2', 'rewardPA' => 4000, 'type' => 'inventory', 'param' => ['id' => 'card_voile', 'min' => 20]],
    ['id' => 'q_voile_3', 'rewardPA' => 15000, 'type' => 'inventory', 'param' => ['id' => 'card_voile', 'min' => 20]],
    ['id' => 'q_navigateur_2', 'rewardPA' => 250, 'type' => 'inventory', 'param' => ['id' => 'auto_5', 'min' => 20]],
    ['id' => 'q_navigateur_3', 'rewardPA' => 5000, 'type' => 'inventory', 'param' => ['id' => 'auto_5', 'min' => 50]],

    ['id' => 'q_cosmetic_1', 'rewardPA' => 30, 'type' => 'cosmetics', 'param' => 3],
    ['id' => 'q_cosmetic_2', 'rewardPA' => 500, 'type' => 'cosmetics', 'param' => 10],
    ['id' => 'q_cosmetic_3', 'rewardPA' => 1000, 'type' => 'cosmetics', 'param' => 15],
    ['id' => 'q_cosmetic_4', 'rewardPA' => 3500, 'type' => 'cosmetics', 'param' => 18],
    ['id' => 'q_cosmetic_master_1', 'rewardPA' => 10000, 'type' => 'cosmetics', 'param' => 20],

    ['id' => 'q_all_upgrades_1', 'rewardPA' => 120, 'type' => 'multi_inventory', 'param' => ['ids' => ['auto_1', 'auto_2', 'auto_3', 'auto_4', 'auto_5'], 'min' => 1]],
    ['id' => 'q_all_upgrades_2', 'rewardPA' => 1050, 'type' => 'multi_inventory', 'param' => ['ids' => ['auto_1', 'auto_2', 'auto_3', 'auto_4', 'auto_5', 'auto_6', 'auto_7', 'auto_8', 'auto_9'], 'min' => 1]],
    ['id' => 'q_all_upgrades_3', 'rewardPA' => 10000, 'type' => 'multi_inventory', 'param' => ['ids' => ['auto_1', 'auto_2', 'auto_3', 'auto_4', 'auto_5', 'auto_6', 'auto_7', 'auto_8', 'auto_9', 'auto_10', 'auto_11', 'auto_12', 'auto_13', 'auto_14'], 'min' => 1]],
    ['id' => 'q_click_all_1', 'rewardPA' => 400, 'type' => 'multi_inventory', 'param' => ['ids' => ['card_canon', 'card_mat', 'card_sirene', 'card_voile'], 'min' => 1]],
    ['id' => 'q_skill_master_1', 'rewardPA' => 20000, 'type' => 'multi_inventory', 'param' => ['ids' => ['card_canon', 'card_mat', 'card_sirene', 'card_voile'], 'min' => 20]],

    ['id' => 'q_auto_mass_1', 'rewardPA' => 4000, 'type' => 'total_auto', 'param' => 500],
];
function calculerGPS(array $inventory): float
{
    global $AUTO_UPGRADES;
    $gps = 0.0;
    foreach ($AUTO_UPGRADES as $id => $cfg) {
        $count = isset($inventory[$id]) ? intval($inventory[$id]) : 0;
        $gps += $count * $cfg['basePower'];
    }
    return $gps;
}
function calculerClickPowerMax(array $inventory): float
{
    $power = 1.0;
    $voileLvl = isset($inventory['card_voile']) ? intval($inventory['card_voile']) : 0;
    if ($voileLvl === 1)
        $power += 5;
    elseif ($voileLvl > 1)
        $power += 10 * ($voileLvl - 1);
    return $power;
}
function verifierQuete(array $quest, float $totalGold, array $inventory, array $unlockedCosmetics): bool
{
    $type = $quest['type'];
    $param = $quest['param'];

    switch ($type) {
        case 'gold':
            return $totalGold >= floatval($param);

        case 'inventory':
            $count = isset($inventory[$param['id']]) ? intval($inventory[$param['id']]) : 0;
            return $count >= $param['min'];

        case 'cosmetics':
            $nonDefault = array_filter($unlockedCosmetics, fn($c) => $c !== 'skin_default' && $c !== 'bg_default');
            return count($nonDefault) >= $param;

        case 'multi_inventory':
            foreach ($param['ids'] as $id) {
                $count = isset($inventory[$id]) ? intval($inventory[$id]) : 0;
                if ($count < $param['min'])
                    return false;
            }
            return true;

        case 'total_auto':
            $total = 0;
            foreach ($inventory as $id => $count) {
                if (strpos($id, 'auto_') === 0)
                    $total += intval($count);
            }
            return $total >= $param;
    }
    return false;
}
?>