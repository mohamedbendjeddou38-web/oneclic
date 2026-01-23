import { LucideIcon } from 'lucide-react';

export interface UpgradeItem {
    id: string;
    name: string;
    baseCost: number;
    basePower: number;
    icon: LucideIcon;
    desc: string;
}

export interface SkinItem {
    id: string;
    name: string;
    cost: number;
    icon: LucideIcon;
    colors: string;
    border: string;
    image?: string;
}

export interface BackgroundItem {
    id: string;
    name: string;
    cost: number;
    css: string;
}

export interface ConfigType {
    clickUpgrades: UpgradeItem[];
    autoUpgrades: UpgradeItem[];
    skins: SkinItem[];
    backgrounds: BackgroundItem[];
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
}