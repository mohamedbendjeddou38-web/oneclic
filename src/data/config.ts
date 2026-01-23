import {
    Skull, Anchor, ScrollText, Zap, Crosshair,
    Bomb, Link as LinkIcon, Flame, Crown,
    Bug, Bird, User, Compass, UserCheck, Ghost, Tent, ShipWheel, Swords,
    Gem, Mountain, Waves
} from 'lucide-react';
import { ConfigType } from '@/types';

export const CONFIG: ConfigType = {
    clickUpgrades: [
        { id: 'hook', name: 'Crochet', baseCost: 15, basePower: 1, icon: Anchor, desc: 'Basique.' },
        { id: 'dagger', name: 'Dague', baseCost: 100, basePower: 5, icon: Swords, desc: 'Aiguisée.' },
        { id: 'pistol', name: 'Pistolet', baseCost: 500, basePower: 12, icon: Crosshair, desc: 'Poudre noire.' },
        { id: 'cutlass', name: 'Coutelas', baseCost: 1500, basePower: 30, icon: Swords, desc: 'Lame courbée.' },
        { id: 'musket', name: 'Mousquet', baseCost: 5000, basePower: 80, icon: Crosshair, desc: 'Longue portée.' },
        { id: 'blunderbuss', name: 'Tromblon', baseCost: 15000, basePower: 200, icon: Zap, desc: 'Gros dégâts.' },
        { id: 'cannon_deck', name: 'Canon de Pont', baseCost: 50000, basePower: 500, icon: Bomb, desc: 'Boum !' },
        { id: 'chain_shot', name: 'Boulets Chaînés', baseCost: 200000, basePower: 1500, icon: LinkIcon, desc: 'Déchire tout.' },
        { id: 'greek_fire', name: 'Feu Grégeois', baseCost: 1000000, basePower: 5000, icon: Flame, desc: 'Brûle sur l\'eau.' },
        { id: 'trident', name: 'Trident Poseidon', baseCost: 15000000, basePower: 25000, icon: Crown, desc: 'Pouvoir divin.' }
    ],
    autoUpgrades: [
        { id: 'rat', name: 'Rat de Cale', baseCost: 50, basePower: 1, icon: Bug, desc: 'Vole des miettes.' },
        { id: 'parrot', name: 'Perroquet', baseCost: 300, basePower: 5, icon: Bird, desc: 'Rapporte l\'or.' },
        { id: 'cabin_boy', name: 'Moussaillon', baseCost: 1200, basePower: 15, icon: User, desc: 'Travaille dur.' },
        { id: 'gunner', name: 'Artilleur', baseCost: 5000, basePower: 45, icon: Crosshair, desc: 'Précision.' },
        { id: 'navigator', name: 'Navigateur', baseCost: 15000, basePower: 100, icon: Compass, desc: 'Trouve les routes.' },
        { id: 'quartermaster', name: 'Quartier-Maître', baseCost: 50000, basePower: 300, icon: ScrollText, desc: 'Gère les stocks.' },
        { id: 'first_mate', name: 'Second', baseCost: 200000, basePower: 1000, icon: UserCheck, desc: 'Loyal.' },
        { id: 'captain', name: 'Capitaine', baseCost: 1000000, basePower: 4000, icon: Skull, desc: 'Légendaire.' },
        { id: 'ghost_ship', name: 'Navire Fantôme', baseCost: 10000000, basePower: 15000, icon: Ghost, desc: 'Immorte.' },
        { id: 'kraken', name: 'Le Kraken', baseCost: 100000000, basePower: 50000, icon: Tent, desc: 'Le monstre.' }
    ],
    skins: [
        { id: 'default', name: 'Doublon d\'Or', cost: 0, icon: Skull, colors: 'from-yellow-300 via-yellow-500 to-yellow-800', border: 'border-yellow-400', image: '/coinSkin/coins1.PNG' },
        { id: 'silver', name: 'Argent Maudit', cost: 5000, icon: Skull, colors: 'from-slate-300 via-slate-400 to-slate-600', border: 'border-slate-300', image: '/coinSkin/coins2.PNG' },
        { id: 'ruby', name: 'Cœur de Pirate', cost: 25000, icon: Gem, colors: 'from-red-400 via-red-600 to-red-900', border: 'border-red-500', image: '/coinSkin/coins3.PNG' },
        { id: 'emerald', name: 'Jade Serpent', cost: 100000, icon: Crown, colors: 'from-emerald-300 via-emerald-600 to-emerald-900', border: 'border-emerald-400', image: '/coinSkin/coins4.PNG' },
        { id: 'sapphire', name: 'Larme d\'Océan', cost: 500000, icon: Waves, colors: 'from-blue-300 via-blue-600 to-blue-900', border: 'border-blue-400', image: '/coinSkin/coins5.PNG' },
        { id: 'amethyst', name: 'Âme du Kraken', cost: 1000000, icon: Tent, colors: 'from-purple-300 via-purple-600 to-purple-900', border: 'border-purple-400', image: '/coinSkin/coins6.PNG' },
        { id: 'bone', name: 'Pièce d\'Os', cost: 2500000, icon: Ghost, colors: 'from-stone-100 via-stone-300 to-stone-500', border: 'border-stone-200', image: '/coinSkin/coins8.PNG' },
        { id: 'obsidian', name: 'Pierre Noire', cost: 5000000, icon: Mountain, colors: 'from-gray-700 via-gray-800 to-black', border: 'border-gray-600', image: '/coinSkin/coins9.PNG' },
        { id: 'neon', name: 'Cyber Doublon', cost: 10000000, icon: Zap, colors: 'from-pink-500 via-purple-500 to-indigo-500', border: 'border-pink-400', image: '/coinSkin/coins 10.PNG' },
        { id: 'void', name: 'Néant', cost: 50000000, icon: Skull, colors: 'from-white via-black to-white', border: 'border-white animate-pulse' },
    ],
    backgrounds: [
        { id: 'default', name: 'Mer Profonde', cost: 0, css: 'bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#172554]' },
        { id: 'sunset', name: 'Coucher Soleil', cost: 10000, css: 'bg-gradient-to-b from-[#4c1d95] via-[#a21caf] to-[#ea580c]' },
        { id: 'toxic', name: 'Mer Toxique', cost: 50000, css: 'bg-gradient-to-b from-[#022c22] via-[#14532d] to-[#365314]' },
        { id: 'retro_gb', name: 'GameBoy Retro', cost: 100000, css: 'bg-gradient-to-b from-[#0f380f] via-[#306230] to-[#8bac0f]' },
        { id: 'blood_sea', name: 'Mer de Sang', cost: 500000, css: 'bg-gradient-to-b from-[#450a0a] via-[#7f1d1d] to-[#991b1b]' },
        { id: 'cave', name: 'Grotte Dorée', cost: 1000000, css: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900 via-yellow-950 to-black' },
        { id: 'fog', name: 'Brume Fantôme', cost: 2500000, css: 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 grayscale' },
        { id: 'galaxy', name: 'Voie Lactée', cost: 5000000, css: 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black' },
        { id: 'blueprint', name: 'Plan Navire', cost: 10000000, css: 'bg-[#1e40af] bg-[size:20px_20px] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]' },
        { id: 'gold_hoard', name: 'Salle du Trésor', cost: 25000000, css: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-yellow-600 to-yellow-900' },
    ]
};

export const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
    return Math.floor(num).toString();
};

export const getCost = (base: number, count: number): number => Math.floor(base * Math.pow(1.15, count));