'use client';

import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { CONFIG, getCost } from '@/data/config';
import {
    GameContextType, InventoryType, ParticleType,
    EquippedType, UpgradeItem, SkinItem, BackgroundItem, MysteryBoxItem, Rarity
} from '@/types';

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gold, setGold] = useState<number>(0);
    const [inventory, setInventory] = useState<InventoryType>({});
    const [view, setView] = useState<'game' | 'shop'>('game');
    const [particles, setParticles] = useState<ParticleType[]>([]);
    const [unlockedCosmetics, setUnlockedCosmetics] = useState<string[]>(['skin_default', 'bg_default']);
    const [equipped, setEquipped] = useState<EquippedType>({ skin: 'default', bg: 'default' });

    const goldRef = useRef<number>(gold);
    const inventoryRef = useRef<InventoryType>(inventory);

    useEffect(() => {
        goldRef.current = gold;
        inventoryRef.current = inventory;
    }, [gold, inventory]);

    // Initialisation
    useEffect(() => {
        const initialInv: InventoryType = {};
        [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades].forEach(i => initialInv[i.id] = 0);

        // Changing save version to reset potentially incompatible saves or handle migration
        const saved = localStorage.getItem('pirateClicker_save_v2');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setGold(parsed.gold);
                setInventory({ ...initialInv, ...parsed.inventory });
                if (parsed.unlockedCosmetics) setUnlockedCosmetics(parsed.unlockedCosmetics);
                if (parsed.equipped) setEquipped(parsed.equipped);
            } catch (e) {
                setInventory(initialInv);
            }
        } else {
            setInventory(initialInv);
        }
    }, []);

    // Sauvegarde Auto
    useEffect(() => {
        const saveInterval = setInterval(() => {
            localStorage.setItem('pirateClicker_save_v2', JSON.stringify({
                gold: goldRef.current,
                inventory: inventoryRef.current,
                unlockedCosmetics,
                equipped,
                time: Date.now()
            }));
        }, 10000);
        return () => clearInterval(saveInterval);
    }, [unlockedCosmetics, equipped]);

    // Boucle de revenus passifs
    const calculateGPS = useCallback((inv: InventoryType): number => {
        return CONFIG.autoUpgrades.reduce((acc, item) => acc + (inv[item.id] || 0) * item.basePower, 0);
    }, []);

    const [activeSkills, setActiveSkills] = useState<{ [key: string]: number }>({});
    const [skillCooldowns, setSkillCooldowns] = useState<{ [key: string]: number }>({});

    // Skill activation
    const activateSkill = (itemId: string) => {
        const item = CONFIG.clickUpgrades.find(i => i.id === itemId);
        if (!item || !item.skillConfig) return;

        const now = Date.now();
        if ((skillCooldowns[itemId] || 0) > now) return; // Cooldown not ready

        const level = inventory[itemId] || 0;
        if (level === 0) return; // Not owned

        // Set active duration
        setActiveSkills(prev => ({ ...prev, [itemId]: now + item.skillConfig!.duration * 1000 }));
        // Set cooldown
        setSkillCooldowns(prev => ({ ...prev, [itemId]: now + item.skillConfig!.cooldown * 1000 }));
    };

    // Cleanup expired skills in the loop
    useEffect(() => {
        const loop = setInterval(() => {
            const now = Date.now();

            // GPS Logic (No Active Multiplier for GPS anymore per user request)
            const gps = calculateGPS(inventoryRef.current);
            if (gps > 0) setGold(prev => prev + gps);

        }, 1000);
        return () => clearInterval(loop);
    }, [calculateGPS]);

    const activeSkillsRef = useRef(activeSkills);
    useEffect(() => { activeSkillsRef.current = activeSkills; }, [activeSkills]);


    const calculateClickPower = useCallback((inv: InventoryType): number => {
        let power = 1;

        // Voile Logic (Passive)
        const voileLvl = inv['card_voile'] || 0;
        if (voileLvl === 1) power += 5;
        else if (voileLvl > 1) power += 10 * (voileLvl - 1);

        return power + CONFIG.clickUpgrades.reduce((acc, item) => acc + (inv[item.id] || 0) * item.basePower, 0);
    }, []);

    // Active Multiplier for Clicks
    const getActiveClickMultiplier = () => {
        const now = Date.now();
        let multiplier = 1;

        // Canon: x5 + (lvl-1)*2
        if (activeSkills['card_canon'] && activeSkills['card_canon'] > now) {
            const lvl = inventory['card_canon'] || 0;
            multiplier *= (5 + (lvl - 1) * 2);
        }
        // Mat: x10 + (lvl-1)*5
        if (activeSkills['card_mat'] && activeSkills['card_mat'] > now) {
            const lvl = inventory['card_mat'] || 0;
            multiplier *= (10 + (lvl - 1) * 5);
        }
        // Sirene: x20 + (lvl-1)*20
        if (activeSkills['card_sirene'] && activeSkills['card_sirene'] > now) {
            const lvl = inventory['card_sirene'] || 0;
            multiplier *= (20 + (lvl - 1) * 20);
        }
        return multiplier;
    };

    const currentGPS = calculateGPS(inventory);
    const currentClickPower = calculateClickPower(inventory) * getActiveClickMultiplier();

    const handleMainClick = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX: number, clientY: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        setGold(prev => prev + currentClickPower);
        const id = Date.now() + Math.random();
        setParticles(prev => [...prev, { id, x: clientX, y: clientY, val: currentClickPower }]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1000);
    };

    const buyItem = (item: UpgradeItem) => {
        const count = inventory[item.id] || 0;
        const cost = getCost(item, count);
        if (gold >= cost) {
            setGold(prev => prev - cost);
            setInventory(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
        }
    };

    const buyOrEquipCosmetic = (type: 'skin' | 'bg', item: SkinItem | BackgroundItem) => {
        const unlockKey = `${type}_${item.id}`;
        if (unlockedCosmetics.includes(unlockKey)) {
            setEquipped(prev => ({ ...prev, [type]: item.id }));
        } else {
            if (gold >= item.cost && item.cost > 0) {
                setGold(prev => prev - item.cost);
                setUnlockedCosmetics(prev => [...prev, unlockKey]);
                setEquipped(prev => ({ ...prev, [type]: item.id }));
            }
        }
    };

    const openMysteryBox = (box: MysteryBoxItem): { type: 'gold' | 'skin' | 'bg' | 'upgrade'; value: number | string; name: string; rarity: Rarity } => {
        if (gold < box.cost) {
            throw new Error("Pas assez d'or !");
        }
        setGold(prev => prev - box.cost);

        const roll = Math.random() * 100;
        let rarity: Rarity = 'common';
        let cumulative = 0;

        if (roll < (cumulative += box.dropRates.common)) rarity = 'common';
        else if (roll < (cumulative += box.dropRates.rare)) rarity = 'rare';
        else if (roll < (cumulative += box.dropRates.epic)) rarity = 'epic';
        else rarity = 'legendary';

        const eligibleSkins = CONFIG.skins.filter(s => s.rarity === rarity && !unlockedCosmetics.includes(`skin_${s.id}`));
        const eligibleBackgrounds = CONFIG.backgrounds.filter(b => b.rarity === rarity && !unlockedCosmetics.includes(`bg_${b.id}`));

        let pool: any[] = [
            ...eligibleSkins.map(s => ({ ...s, type: 'skin' as const })),
            ...eligibleBackgrounds.map(b => ({ ...b, type: 'bg' as const }))
        ];

        if (rarity === 'common') {
            const upgrades = [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades];
            pool = [
                ...pool,
                ...upgrades.map(u => ({ ...u, type: 'upgrade' as const }))
            ];
        }

        if (pool.length > 0) {
            const item = pool[Math.floor(Math.random() * pool.length)];

            if (item.type === 'upgrade') {
                setInventory(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
                return { type: 'upgrade', value: item.id, name: `+1 ${item.name}`, rarity: rarity };
            } else {
                const unlockKey = `${item.type}_${item.id}`;
                setUnlockedCosmetics(prev => [...prev, unlockKey]);
                return { type: item.type, value: item.id, name: item.name, rarity: rarity };
            }
        } else {
            const goldReward = Math.floor(box.cost * (0.5 + Math.random()));
            setGold(prev => prev + goldReward);
            return { type: 'gold', value: goldReward, name: `${formatNumber(goldReward)} Or`, rarity: rarity };
        }
    };

    return (
        <GameContext.Provider value={{
            gold, inventory, view, setView, particles, equipped,
            currentGPS, currentClickPower, handleMainClick, buyItem, buyOrEquipCosmetic, unlockedCosmetics, openMysteryBox,
            activateSkill, activeSkills, skillCooldowns
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};

// Helper pour formatNumber (doublon pour éviter import circulaire si besoin, mais importé de config est mieux)
const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
    return Math.floor(num).toString();
};