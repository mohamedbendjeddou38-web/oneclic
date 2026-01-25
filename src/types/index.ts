import { LucideIcon } from 'lucide-react';

export interface UpgradeItem {
    id: string;
    name: string;
    baseCost: number;
    basePower: number;
    icon: LucideIcon;
    desc: string;
    costMultiplier?: number;
    image?: string;
    activeIcon?: string;
    skillConfig?: {
        duration: number; // seconds
        cooldown: number; // seconds
        type: 'buff_gps' | 'buff_click';
    };
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface SkinItem {
    id: string;
    name: string;
    cost: number;
    icon: LucideIcon;
    colors: string;
    border: string;
    image?: string;
    rarity?: Rarity; // Optional for compatibility, but used in drop logic
}

export interface BackgroundItem {
    id: string;
    name: string;
    cost: number;
    css?: string; // Made optional as we might rely on image now
    image: string; // Made required or optional, let's say required for new ones but we'll stick to string
    rarity?: Rarity;
}

export interface MysteryBoxItem {
    id: string;
    name: string;
    cost: number;
    description: string;
    icon: LucideIcon;
    dropRates: {
        common: number;
        rare: number;
        epic: number;
        legendary: number;
    };
}

export interface ConfigType {
    clickUpgrades: UpgradeItem[];
    autoUpgrades: UpgradeItem[];
    skins: SkinItem[];
    backgrounds: BackgroundItem[];
    mysteryBoxes: MysteryBoxItem[];
}

export interface InventoryType {
    [key: string]: number;
}

export interface EquippedType {
    skin: string;
    bg: string;
}

export interface ParticleType {
    id: number;
    x: number;
    y: number;
    val: number;
}

export interface GameContextType {
    gold: number;
    inventory: InventoryType;
    view: 'game' | 'shop';
    setView: (view: 'game' | 'shop') => void;
    particles: ParticleType[];
    equipped: EquippedType;
    currentGPS: number;
    currentClickPower: number;
    handleMainClick: (e: React.MouseEvent | React.TouchEvent) => void;
    buyItem: (item: UpgradeItem) => void;
    buyOrEquipCosmetic: (type: 'skin' | 'bg', item: SkinItem | BackgroundItem) => void;
    unlockedCosmetics: string[];
    openMysteryBox: (box: MysteryBoxItem) => { type: 'gold' | 'skin' | 'bg' | 'upgrade'; value: number | string; name: string; rarity: Rarity };
    activateSkill: (itemId: string) => void;
    activeSkills: { [key: string]: number };
    skillCooldowns: { [key: string]: number };
}