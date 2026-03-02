import { LucideIcon } from 'lucide-react';

export interface UpgradeItem {
    id: string;
    name: string;
    baseCost: number;
    basePower: number;
    icon?: LucideIcon;
    desc: string;
    costMultiplier?: number;
    image?: string;
    activeIcon?: string;
    skillConfig?: {
        duration: number;
        cooldown: number;
        type: 'buff_gps' | 'buff_click';
    };
    rarity?: Rarity;
    currency?: 'gold' | 'pa';
    priceLabel?: string;
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface SkinItem {
    id: string;
    name: string;
    cost: number;
    icon?: LucideIcon;
    colors: string;
    border: string;
    image?: string;
    rarity?: Rarity;
    currency?: 'gold' | 'pa';
    priceLabel?: string;
}

export interface BackgroundItem {
    id: string;
    name: string;
    cost: number;
    css?: string;
    image: string;
    rarity?: Rarity;
    currency?: 'gold' | 'pa';
    priceLabel?: string;
}

export interface MysteryBoxItem {
    id: string;
    name: string;
    cost: number;
    description: string;
    icon?: LucideIcon;
    image?: string;
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

export interface LeaderboardEntry {
    name: string;
    totalGold: number;
}

export interface LeaderboardData {
    leaderboard: LeaderboardEntry[];
    userRank: number | null;
    userStats: LeaderboardEntry | null;
    nextUpdate: number;
}

export interface QuestType {
    id: string;
    title: string;
    description: string;
    rewardPA: number;

    condition: (state: {
        totalGold: number;
        inventory: InventoryType;
        unlockedCosmetics: string[];
    }) => boolean;
}

export interface GameContextType {
    token: string | null;
    uid: string | null;
    gold: number;
    totalGold: number;
    ancientCoins: number;
    completedQuests: string[];
    trackedQuests: string[];
    toggleTrackQuest: (questId: string) => void;
    inventory: InventoryType;
    view: 'game' | 'shop';
    setView: (view: 'game' | 'shop') => void;
    forceSync: () => Promise<boolean>;
    particles: ParticleType[];
    equipped: EquippedType;
    currentGPS: number;
    currentClickPower: number;
    handleMainClick: (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => void;
    buyItem: (item: UpgradeItem) => void;
    buyOrEquipCosmetic: (type: 'skin' | 'bg', item: SkinItem | BackgroundItem) => void;
    unlockedCosmetics: string[];
    openMysteryBox: (box: MysteryBoxItem) => Promise<{ type: 'skin' | 'bg' | 'gold' | 'upgrade'; value: number | string; name: string; rarity: Rarity } | null>;
    activateSkill: (itemId: string) => void;
    activeSkills: { [key: string]: number };
    skillCooldowns: { [key: string]: number };
    comboClicks: number;
    comboMultiplier: number;
    claimQuest: (questId: string) => Promise<void>;
    fetchLeaderboard: () => Promise<LeaderboardData | null>;
    syncCountdown: number;
    lastSyncTime: number;
    isLoading: boolean;
    userEmail: string | null;
    userPseudo: string | null;
}
