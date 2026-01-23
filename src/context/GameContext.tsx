'use client';

import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { CONFIG } from '@/data/config';
import {
    GameContextType, InventoryType, ParticleType,
    EquippedType, UpgradeItem, SkinItem, BackgroundItem
} from '@/types';
import { getCost } from '@/data/config';

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

        const saved = localStorage.getItem('pirateClicker_save_v1');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setGold(parsed.gold);
                setInventory({ ...initialInv, ...parsed.inventory });
                if(parsed.unlockedCosmetics) setUnlockedCosmetics(parsed.unlockedCosmetics);
                if(parsed.equipped) setEquipped(parsed.equipped);
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
            localStorage.setItem('pirateClicker_save_v1', JSON.stringify({
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

    useEffect(() => {
        const loop = setInterval(() => {
            const gps = calculateGPS(inventoryRef.current);
            if (gps > 0) setGold(prev => prev + gps);
        }, 1000);
        return () => clearInterval(loop);
    }, [calculateGPS]);

    const calculateClickPower = useCallback((inv: InventoryType): number => {
        return 1 + CONFIG.clickUpgrades.reduce((acc, item) => acc + (inv[item.id] || 0) * item.basePower, 0);
    }, []);

    const currentGPS = calculateGPS(inventory);
    const currentClickPower = calculateClickPower(inventory);

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
        const cost = getCost(item.baseCost, count);
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
            if (gold >= item.cost) {
                setGold(prev => prev - item.cost);
                setUnlockedCosmetics(prev => [...prev, unlockKey]);
                setEquipped(prev => ({ ...prev, [type]: item.id }));
            }
        }
    };

    return (
        <GameContext.Provider value={{
            gold, inventory, view, setView, particles, equipped,
            currentGPS, currentClickPower, handleMainClick, buyItem, buyOrEquipCosmetic, unlockedCosmetics
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