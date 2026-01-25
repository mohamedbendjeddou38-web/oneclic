import {
    Skull, Anchor, ScrollText, Zap, Crosshair,
    Bomb, Link as LinkIcon, Flame, Crown,
    Bug, Bird, User, Compass, UserCheck, Ghost, Tent, ShipWheel, Swords,
    Gem, Mountain, Waves, Box, Gift, Trophy
} from 'lucide-react';
import { ConfigType, UpgradeItem } from '@/types';

export const CONFIG: ConfigType = {
    clickUpgrades: [
        { id: 'card_canon', name: 'Canon de Bord', baseCost: 0, basePower: 0, icon: Bomb, desc: 'Améliore le punch.', image: '/carte amélioration/carte_canon.png', activeIcon: '/icon_comp/icon_canon.png', skillConfig: { duration: 15, cooldown: 7200, type: 'buff_click' } },
        { id: 'card_mat', name: 'Grand Mât', baseCost: 0, basePower: 0, icon: ShipWheel, desc: 'Solidité accrue.', image: '/carte amélioration/carte_mat.png', activeIcon: '/icon_comp/icon_voile.png', skillConfig: { duration: 20, cooldown: 7200, type: 'buff_click' } },
        { id: 'card_sirene', name: 'Figure de Sirène', baseCost: 0, basePower: 0, icon: Skull, desc: 'Charisme pirate.', image: '/carte amélioration/carte_sirène.png', activeIcon: '/icon_comp/icon_sirene.png', skillConfig: { duration: 30, cooldown: 7200, type: 'buff_click' } },
        { id: 'card_voile', name: 'Voiles de Soie', baseCost: 0, basePower: 0, icon: Waves, desc: 'Vitesse de clic.', image: '/carte amélioration/carte_voile.png' }
    ],
    autoUpgrades: [
        { id: 'auto_1', name: 'Rat de Cale', baseCost: 50, basePower: 0.1, icon: Bug, desc: 'Vole des miettes.', costMultiplier: 1.3 },
        { id: 'auto_2', name: 'Perroquet', baseCost: 1000, basePower: 0.4, icon: Bird, desc: 'Rapporte l\'or.', costMultiplier: 1.3 },
        { id: 'auto_3', name: 'Moussaillon', baseCost: 10000, basePower: 1, icon: User, desc: 'Travaille dur.', costMultiplier: 1.3 },
        { id: 'auto_4', name: 'Artilleur', baseCost: 50000, basePower: 2.7, icon: Crosshair, desc: 'Précision.', costMultiplier: 1.3 },
        { id: 'auto_5', name: 'Navigateur', baseCost: 120000, basePower: 4.5, icon: Compass, desc: 'Trouve les routes.', costMultiplier: 1.3 },
        { id: 'auto_6', name: 'Quartier-Maître', baseCost: 250000, basePower: 7, icon: ScrollText, desc: 'Gère les stocks.', costMultiplier: 1.3 },
        { id: 'auto_7', name: 'Second', baseCost: 400000, basePower: 15, icon: UserCheck, desc: 'Loyal.', costMultiplier: 1.3 },
        { id: 'auto_8', name: 'Capitaine', baseCost: 800000, basePower: 35, icon: Skull, desc: 'Légendaire.', costMultiplier: 1.15 },
        { id: 'auto_9', name: 'Navire Fantôme', baseCost: 1200000, basePower: 70, icon: Ghost, desc: 'Immortel.', costMultiplier: 1.15 },
        { id: 'auto_10', name: 'Le Kraken', baseCost: 6000000, basePower: 250, icon: Tent, desc: 'Le monstre.', costMultiplier: 1.12 },
        { id: 'auto_11', name: 'Poseidon', baseCost: 28000000, basePower: 1500, icon: Crown, desc: 'Dieu des mers.', costMultiplier: 1.12 },
        { id: 'auto_12', name: 'Cité d\'Atlantis', baseCost: 80000000, basePower: 4000, icon: Waves, desc: 'Cité perdue.', costMultiplier: 1.10 },
        { id: 'auto_13', name: 'Abysse Infini', baseCost: 350000000, basePower: 8000, icon: Mountain, desc: 'Profondeurs.', costMultiplier: 1.10 },
        { id: 'auto_14', name: 'Seigneur des Océans', baseCost: 450000000, basePower: 14000, icon: Trophy, desc: 'Maître absolu.', costMultiplier: 1.09 }
    ],
    skins: [
        { id: 'default', name: 'Doublon d\'Or', cost: 0, icon: Skull, colors: 'from-yellow-300 via-yellow-500 to-yellow-800', border: 'border-yellow-400', image: '/coinSkin/coins1.PNG', rarity: 'common' },
        { id: 'silver', name: 'Argent Maudit', cost: 5000, icon: Skull, colors: 'from-slate-300 via-slate-400 to-slate-600', border: 'border-slate-300', image: '/coinSkin/coins2.PNG', rarity: 'common' },
        { id: 'ruby', name: 'Cœur de Pirate', cost: 25000, icon: Gem, colors: 'from-red-400 via-red-600 to-red-900', border: 'border-red-500', image: '/coinSkin/coins3.PNG', rarity: 'rare' },
        { id: 'emerald', name: 'Jade Serpent', cost: 100000, icon: Crown, colors: 'from-emerald-300 via-emerald-600 to-emerald-900', border: 'border-emerald-400', image: '/coinSkin/coins4.PNG', rarity: 'rare' },
        { id: 'sapphire', name: 'Larme d\'Océan', cost: 500000, icon: Waves, colors: 'from-blue-300 via-blue-600 to-blue-900', border: 'border-blue-400', image: '/coinSkin/coins5.PNG', rarity: 'epic' },
        { id: 'amethyst', name: 'Âme du Kraken', cost: 1000000, icon: Tent, colors: 'from-purple-300 via-purple-600 to-purple-900', border: 'border-purple-400', image: '/coinSkin/coins6.PNG', rarity: 'epic' },
        { id: 'bone', name: 'Pièce d\'Os', cost: 2500000, icon: Ghost, colors: 'from-stone-100 via-stone-300 to-stone-500', border: 'border-stone-200', image: '/coinSkin/coins8.PNG', rarity: 'legendary' },
        { id: 'obsidian', name: 'Pierre Noire', cost: 5000000, icon: Mountain, colors: 'from-gray-700 via-gray-800 to-black', border: 'border-gray-600', image: '/coinSkin/coins9.PNG', rarity: 'legendary' },
        { id: 'neon', name: 'Cyber Doublon', cost: 10000000, icon: Zap, colors: 'from-pink-500 via-purple-500 to-indigo-500', border: 'border-pink-400', image: '/coinSkin/coins 10.PNG', rarity: 'legendary' },
        { id: 'void', name: 'Néant', cost: 50000000, icon: Skull, colors: 'from-white via-black to-white', border: 'border-white animate-pulse', rarity: 'legendary' },
    ],
    backgrounds: [
        { id: 'default', name: 'Mer Calme', cost: 0, image: '/backgroundSkin/background1.png', rarity: 'common' },
        { id: 'sunset', name: 'Coucher Soleil', cost: 10000, image: '/backgroundSkin/background2.png', rarity: 'common' },
        { id: 'toxic', name: 'Ile rempli de crack', cost: 50000, image: '/backgroundSkin/background3.png', rarity: 'rare' },
        { id: 'retro_gb', name: 'Port de la riat', cost: 100000, image: '/backgroundSkin/background4.png', rarity: 'rare' },
        { id: 'blood_sea', name: 'Ile de Mexicanos', cost: 500000, image: '/backgroundSkin/background5.png', rarity: 'epic' },
        { id: 'cave', name: 'Ile pleine de Cannabis', cost: 1000000, image: '/backgroundSkin/background6.png', rarity: 'epic' },
        { id: 'fog', name: 'Bateau Pirate', cost: 2500000, image: '/backgroundSkin/background7.png', rarity: 'epic' },
        { id: 'galaxy', name: 'La Marine', cost: 5000000, image: '/backgroundSkin/background8.png', rarity: 'legendary' },
        { id: 'blueprint', name: 'Il faut réparée le navire!!!!!', cost: 10000000, image: '/backgroundSkin/background9.png', rarity: 'legendary' },
        { id: 'gold_hoard', name: 'KrakHead', cost: 25000000, image: '/backgroundSkin/background10.png', rarity: 'legendary' },
        { id: 'abyss', name: 'Abysses', cost: 0, image: '/backgroundSkin/background11.png', rarity: 'epic' },
        { id: 'kraken_lair', name: 'Antre du Kraken', cost: 0, image: '/backgroundSkin/background12.png', rarity: 'legendary' },
    ],
    mysteryBoxes: [
        {
            id: 'box_common',
            name: 'Coffre Oublié',
            cost: 50000,
            description: 'Un vieux coffre repêché. Contient souvent des babioles.',
            icon: Box,
            dropRates: { common: 83, rare: 15.7, epic: 1.29, legendary: 0.01 }
        },
        {
            id: 'box_rare',
            name: 'Coffre de Capitaine',
            cost: 250000,
            description: 'Le butin d\'un capitaine. Bonnes chances d\'objets rares.',
            icon: Gift,
            dropRates: { common: 65, rare: 25, epic: 9.9, legendary: 0.1 }
        },
        {
            id: 'box_legendary',
            name: 'Trésor du Roi Pirate',
            cost: 1000000,
            description: 'Légendaire. Contient les objets les plus précieux des sept mers.',
            icon: Trophy,
            dropRates: { common: 55, rare: 25, epic: 20, legendary: 0.5 }
        },
    ]
};

export const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
    return (Math.floor(num * 10) / 10).toString();
};

export const getCost = (item: UpgradeItem, count: number): number => Math.floor(item.baseCost * Math.pow(item.costMultiplier ?? 1.15, count));
