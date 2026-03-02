'use client';

import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { CONFIG, getCost } from '@/data/config';
import { QUESTS } from '@/data/quests';
import {
    GameContextType, InventoryType, ParticleType,
    EquippedType, UpgradeItem, SkinItem, BackgroundItem, MysteryBoxItem, Rarity
} from '@/types';
import { ModalAuth } from '@/components/ModalAuth';
import { LoaderPirate } from '@/components/LoaderPirate';
import { auth } from '@/lib/firebase';
import { onIdTokenChanged } from 'firebase/auth';

const GameContext = createContext<GameContextType | null>(null);

const getApiBase = (): string => {
    return 'https://api-mohamed.inkart.fr/api';
};
const API_BASE = getApiBase();


export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(null);
    const [uid, setUid] = useState<string | null>(null);

    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPseudo, setUserPseudo] = useState<string | null>(null);


    const [isInitialized, setIsInitialized] = useState(false);

    const [gold, setGold] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [totalGold, setTotalGold] = useState<number>(0);
    const [ancientCoins, setAncientCoins] = useState<number>(0);
    const [completedQuests, setCompletedQuests] = useState<string[]>([]);
    const [inventory, setInventory] = useState<InventoryType>({});
    const [view, setView] = useState<'game' | 'shop'>('game');
    const [time, setTime] = useState(() => Date.now());
    const [particles, setParticles] = useState<ParticleType[]>([]);
    const [unlockedCosmetics, setUnlockedCosmetics] = useState<string[]>(['skin_default', 'bg_default']);
    const [equipped, setEquipped] = useState<EquippedType>({ skin: 'default', bg: 'default' });
    const [comboClicks, setComboClicks] = useState<number>(0);
    const [syncCountdown, setSyncCountdown] = useState<number>(10);
    const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now());
    const [trackedQuests, setTrackedQuests] = useState<string[]>([]);

    const lastClickTimeRef = useRef<number>(Date.now());

    const goldRef = useRef<number>(gold);
    const totalGoldRef = useRef<number>(totalGold);
    const ancientCoinsRef = useRef<number>(ancientCoins);
    const completedQuestsRef = useRef<string[]>(completedQuests);
    const inventoryRef = useRef<InventoryType>(inventory);
    const unlockedCosmeticsRef = useRef<string[]>(unlockedCosmetics);
    const trackedQuestsRef = useRef<string[]>([]);
    const equippedRef = useRef<EquippedType>(equipped);
    const skillsRef = useRef<{ [key: string]: { lastUsed: number } }>({});
    const hasLoadedRef = useRef(false);
    const tokenRef = useRef<string | null>(null);
    const isPhpLoggedInRef = useRef(false);
    const claimQueueRef = useRef<Promise<void>>(Promise.resolve());

    const loadStateFromApi = async (currentToken: string, force = false) => {
        if (hasLoadedRef.current && !force) {
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/sync.php`, {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();
            if (res.ok && data.state) {
                const fullInv: InventoryType = {};
                [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades].forEach(i => fullInv[i.id] = 0);
                if (data.state.inventory) {
                    Object.assign(fullInv, data.state.inventory);
                }

                const fullUnlocked = data.state.unlockedCosmetics || ['skin_default', 'bg_default'];
                const fullEquipped = data.state.equipped || { skin: 'default', bg: 'default' };

                if (data.state.skills) {
                    skillsRef.current = data.state.skills;
                    const newCooldowns: { [key: string]: number } = {};
                    const newActives: { [key: string]: number } = {};
                    const now = Date.now();

                    Object.keys(data.state.skills).forEach(skillId => {
                        const lastUsedSec = data.state.skills[skillId].lastUsed;
                        if (lastUsedSec) {
                            const lastUsedMs = lastUsedSec * 1000;
                            const item = CONFIG.clickUpgrades.find(i => i.id === skillId);
                            if (item && item.skillConfig) {
                                const cdExpiry = lastUsedMs + item.skillConfig.cooldown * 1000;
                                const activeExpiry = lastUsedMs + item.skillConfig.duration * 1000;

                                if (cdExpiry > now) newCooldowns[skillId] = cdExpiry;
                                if (activeExpiry > now) newActives[skillId] = activeExpiry;
                            }
                        }
                    });
                    setSkillCooldowns(newCooldowns);
                    setActiveSkills(newActives);
                }


                hasLoadedRef.current = true;

                const serverGold = Number(data.state.gold) || 0;
                const serverTotalGold = Number(data.state.totalGold) || 0;
                const finalTotalGold = Math.max(serverTotalGold, serverGold);

                goldRef.current = serverGold;
                totalGoldRef.current = finalTotalGold;
                ancientCoinsRef.current = Number(data.state.ancientCoins) || 0;
                completedQuestsRef.current = data.state.completedQuests || [];
                inventoryRef.current = fullInv;
                unlockedCosmeticsRef.current = fullUnlocked;
                equippedRef.current = fullEquipped;
                trackedQuestsRef.current = data.state.trackedQuests || [];

                setGold(goldRef.current);
                setTotalGold(totalGoldRef.current);
                setAncientCoins(ancientCoinsRef.current);
                setCompletedQuests([...completedQuestsRef.current]);
                setInventory({ ...inventoryRef.current });
                setUnlockedCosmetics([...unlockedCosmeticsRef.current]);
                setEquipped({ ...equippedRef.current });
                setTrackedQuests([...trackedQuestsRef.current]);
                setUserPseudo(data.state.displayName || null);
                setUserEmail(data.state.email || null);

            } else if (res.status === 401) {
                setToken(null);
                setUid(null);
                tokenRef.current = null;
                isPhpLoggedInRef.current = false;
                hasLoadedRef.current = false;
            }
        } catch (e) {
            console.error('>>> [LOAD] Erreur fatale chargement état:', e);
        } finally {
            setIsInitialized(true);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        let isMount = true;


        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        const storedUid = typeof window !== 'undefined' ? localStorage.getItem('auth_uid') : null;

        if (storedToken && storedUid) {
            isPhpLoggedInRef.current = true;
            tokenRef.current = storedToken;
            setToken(storedToken);
            setUid(storedUid);

            if (!hasLoadedRef.current) {
                loadStateFromApi(storedToken);
            }
        }

        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                try {
                    const firebaseToken = await user.getIdToken();
                    if (!isMount) return;


                    setToken(firebaseToken);
                    setUid(user.uid);
                    tokenRef.current = firebaseToken;
                    isPhpLoggedInRef.current = false;

                    setUserPseudo(user.displayName || (user.email ? user.email.split('@')[0] : 'Pirate'));
                    setUserEmail(user.email);

                    if (!hasLoadedRef.current) {
                        await loadStateFromApi(firebaseToken);
                    }
                } catch (e) {
                    console.error("Erreur Google Auth", e);
                }
            } else {

                if (!isPhpLoggedInRef.current) {
                    setToken(null);
                    setUid(null);
                    tokenRef.current = null;
                    setIsInitialized(true);
                    setIsLoading(false);
                    hasLoadedRef.current = false;

                    setGold(0);
                    setTotalGold(0);
                    setAncientCoins(0);
                    setCompletedQuests([]);
                    setInventory({});
                    setUnlockedCosmetics(['skin_default', 'bg_default']);
                    setEquipped({ skin: 'default', bg: 'default' });
                    setActiveSkills({});
                    setSkillCooldowns({});
                    setUserEmail(null);
                    setUserPseudo(null);

                    goldRef.current = 0;
                    totalGoldRef.current = 0;
                    ancientCoinsRef.current = 0;
                    completedQuestsRef.current = [];
                    inventoryRef.current = {};
                } else {
                    if (hasLoadedRef.current) {
                        setIsInitialized(true);
                    }
                }
            }
        });

        return () => {
            isMount = false;
            unsubscribe();
        };
    }, []);

    const handleLoginSuccess = async (newToken: string, newUid: string) => {

        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', newToken);
            localStorage.setItem('auth_uid', newUid);
        }

        if (newToken && newUid) {
            isPhpLoggedInRef.current = true;
            tokenRef.current = newToken;
            setToken(newToken);
            setUid(newUid);
            hasLoadedRef.current = false;
            await loadStateFromApi(newToken);
        }
    };





    const syncWithServer = useCallback(async (isLogout = false): Promise<boolean> => {
        if (!hasLoadedRef.current) return false;

        let currentAuthToken = tokenRef.current;

        if (auth.currentUser) {
            try {
                const fr = await auth.currentUser.getIdToken(false);
                if (fr) { currentAuthToken = fr; tokenRef.current = fr; }
            } catch (e) { }

        }

        if (!currentAuthToken) return false;

        try {
            const payload = {
                fullState: {
                    gold: goldRef.current,
                    totalGold: totalGoldRef.current,
                    ancientCoins: ancientCoinsRef.current,
                    completedQuests: completedQuestsRef.current,
                    inventory: inventoryRef.current,
                    unlockedCosmetics: unlockedCosmeticsRef.current,
                    equipped: equippedRef.current,
                    skills: skillsRef.current,
                    trackedQuests: trackedQuestsRef.current
                }
            };


            const res = await fetch(`${API_BASE}/sync.php`, {
                method: 'POST',
                keepalive: isLogout,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentAuthToken}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setSyncCountdown(10);
                setLastSyncTime(Date.now());
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setSyncCountdown(prev => {
                if (prev <= 1) {
                    syncWithServer();
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [syncWithServer]);


    useEffect(() => {
        const handleUnloadOrHide = (e?: Event) => {
            if (e && e.type === 'visibilitychange' && document.visibilityState !== 'hidden') {
                return;
            }
            if (token && hasLoadedRef.current) {
                const payload = {
                    token: token,
                    fullState: {
                        gold: goldRef.current,
                        totalGold: Math.max(totalGoldRef.current, goldRef.current),
                        ancientCoins: ancientCoinsRef.current,
                        completedQuests: completedQuestsRef.current,
                        inventory: inventoryRef.current,
                        unlockedCosmetics: unlockedCosmeticsRef.current,
                        equipped: equippedRef.current,
                        skills: skillsRef.current,
                        trackedQuests: trackedQuestsRef.current
                    }
                };
                const data = JSON.stringify(payload);

                try {

                    fetch(`${API_BASE}/sync.php`, {
                        method: 'POST',
                        keepalive: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: data
                    }).catch(() => {

                        const blob = new Blob([data], { type: 'text/plain' });
                        navigator.sendBeacon(`${API_BASE}/sync.php`, blob);
                    });
                } catch (e) {
                    const blob = new Blob([data], { type: 'text/plain' });
                    navigator.sendBeacon(`${API_BASE}/sync.php`, blob);
                }
            }
        };
        window.addEventListener('beforeunload', handleUnloadOrHide);
        window.addEventListener('visibilitychange', handleUnloadOrHide);
        window.addEventListener('pagehide', handleUnloadOrHide);

        return () => {
            window.removeEventListener('beforeunload', handleUnloadOrHide);
            window.removeEventListener('visibilitychange', handleUnloadOrHide);
            window.removeEventListener('pagehide', handleUnloadOrHide);
        };
    }, [token]);


    const calculateGPS = useCallback((inv: InventoryType): number => {
        return CONFIG.autoUpgrades.reduce((acc, item) => acc + (inv[item.id] || 0) * item.basePower, 0);
    }, []);

    const [activeSkills, setActiveSkills] = useState<{ [key: string]: number }>({});
    const [skillCooldowns, setSkillCooldowns] = useState<{ [key: string]: number }>({});

    const activateSkill = (itemId: string) => {
        const item = CONFIG.clickUpgrades.find(i => i.id === itemId);
        if (!item || !item.skillConfig) return;

        const now = Date.now();
        if ((skillCooldowns[itemId] || 0) > now) return;

        const isAnySkillActive = Object.values(activeSkills).some(expiry => expiry > now);
        if (isAnySkillActive) return;

        const level = inventory[itemId] || 0;
        if (level === 0) return;

        setActiveSkills(prev => ({ ...prev, [itemId]: now + item.skillConfig!.duration * 1000 }));
        setSkillCooldowns(prev => ({ ...prev, [itemId]: now + item.skillConfig!.cooldown * 1000 }));


        skillsRef.current[itemId] = { lastUsed: Math.floor(now / 1000) };
    };


    useEffect(() => {
        const loop = setInterval(() => {
            setTime(Date.now());

            const gps = calculateGPS(inventoryRef.current);
            if (gps > 0) {
                setGold(prev => prev + gps);
                setTotalGold(prev => prev + gps);

                goldRef.current += gps;
                totalGoldRef.current += gps;
            }

        }, 1000);
        return () => clearInterval(loop);
    }, [calculateGPS]);

    useEffect(() => {
        const comboLoop = setInterval(() => {
            if (Date.now() - lastClickTimeRef.current > 1500) {
                setComboClicks(prev => {
                    if (prev <= 0) return 0;

                    const newClicks = prev - 1.2;
                    return Math.max(0, newClicks);
                });
            }
        }, 50);
        return () => clearInterval(comboLoop);
    }, []);

    const calculateClickPower = useCallback((inv: InventoryType): number => {
        let power = 1;
        const voileLvl = inv['card_voile'] || 0;
        if (voileLvl === 1) power += 5;
        else if (voileLvl > 1) power += 10 * (voileLvl - 1);
        return power + CONFIG.clickUpgrades.reduce((acc, item) => acc + (inv[item.id] || 0) * item.basePower, 0);
    }, []);

    const getActiveClickMultiplier = () => {
        const now = time;
        let multiplier = 1;

        if (activeSkills['card_canon'] && activeSkills['card_canon'] > now) {
            const lvl = inventory['card_canon'] || 0;
            multiplier *= (5 + (lvl - 1) * 2);
        }
        if (activeSkills['card_mat'] && activeSkills['card_mat'] > now) {
            const lvl = inventory['card_mat'] || 0;
            multiplier *= (10 + (lvl - 1) * 5);
        }
        if (activeSkills['card_sirene'] && activeSkills['card_sirene'] > now) {
            const lvl = inventory['card_sirene'] || 0;
            multiplier *= (20 + (lvl - 1) * 20);
        }
        return multiplier;
    };

    const getComboMultiplier = (clicks: number) => {
        if (clicks >= 75) return 4;
        if (clicks >= 50) return 3;
        if (clicks >= 25) return 2;
        return 1;
    };
    const comboMultiplier = getComboMultiplier(comboClicks);

    const currentGPS = calculateGPS(inventory);
    const currentClickPower = calculateClickPower(inventory) * getActiveClickMultiplier() * comboMultiplier;

    const handleMainClick = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
        let clientX: number, clientY: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        lastClickTimeRef.current = Date.now();
        setComboClicks(prev => Math.min(75, prev + 1));

        setGold(prev => prev + currentClickPower);
        setTotalGold(prev => prev + currentClickPower);


        goldRef.current += currentClickPower;
        totalGoldRef.current += currentClickPower;

        const id = Date.now() + Math.random();
        setParticles(prev => [...prev, { id, x: clientX, y: clientY, val: currentClickPower }]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1000);
    };


    const buyItem = (item: UpgradeItem) => {
        const currentCount = inventoryRef.current[item.id] || 0;
        const cost = getCost(item, currentCount);
        const currency = item.currency || 'gold';

        if (currency === 'pa') {
            if (ancientCoinsRef.current >= cost) {
                inventoryRef.current[item.id] = currentCount + 1;
                ancientCoinsRef.current -= cost;
                setAncientCoins(ancientCoinsRef.current);
                setInventory({ ...inventoryRef.current });
                syncWithServer(false);
            }
        } else {
            if (goldRef.current >= cost) {
                inventoryRef.current[item.id] = currentCount + 1;
                goldRef.current -= cost;
                setGold(goldRef.current);
                setInventory({ ...inventoryRef.current });
                syncWithServer(false);
            }
        }
    };

    const buyOrEquipCosmetic = async (type: 'skin' | 'bg', item: SkinItem | BackgroundItem) => {
        const unlockKey = `${type}_${item.id}`;
        if (unlockedCosmeticsRef.current.includes(unlockKey)) {
            setEquipped(prev => {
                const newState = { ...prev, [type]: item.id };
                equippedRef.current = newState;
                return newState;
            });
        } else {
            const currency = (item as any).currency || 'gold';
            const canAfford = currency === 'pa' ? ancientCoinsRef.current >= item.cost : goldRef.current >= item.cost;

            if (canAfford && item.cost > 0) {
                if (currency === 'pa') {
                    ancientCoinsRef.current -= item.cost;
                    setAncientCoins(ancientCoinsRef.current);
                } else {
                    goldRef.current -= item.cost;
                    setGold(goldRef.current);
                }
                unlockedCosmeticsRef.current = [...unlockedCosmeticsRef.current, unlockKey];
                equippedRef.current = { ...equippedRef.current, [type]: item.id };
                setUnlockedCosmetics(unlockedCosmeticsRef.current);
                setEquipped(equippedRef.current);
                syncWithServer(false);
            }
        }
    };

    const openMysteryBox = async (box: MysteryBoxItem): Promise<{ type: 'gold' | 'skin' | 'bg' | 'upgrade'; value: number | string; name: string; rarity: Rarity } | null> => {
        if (goldRef.current < box.cost) {
            throw new Error("Pas assez d'or !");
        }

        let currentAuthToken = tokenRef.current;
        if (auth.currentUser) {
            try { currentAuthToken = await auth.currentUser.getIdToken(false); } catch (e) { }
        }
        if (!currentAuthToken) throw new Error('Non connecté');

        const res = await fetch(`${API_BASE}/open_box.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentAuthToken}`
            },
            body: JSON.stringify({ boxId: box.id })
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
            throw new Error(data.error || 'Erreur serveur');
        }


        goldRef.current = data.newGold;
        totalGoldRef.current = data.newTotalGold;
        setGold(data.newGold);
        setTotalGold(data.newTotalGold);

        if (data.newInventory) {
            inventoryRef.current = { ...inventoryRef.current, ...data.newInventory };
            setInventory({ ...inventoryRef.current });
        }
        if (data.newUnlockedCosmetics) {
            unlockedCosmeticsRef.current = data.newUnlockedCosmetics;
            setUnlockedCosmetics(data.newUnlockedCosmetics);
        }

        const reward = data.reward;

        let displayName = reward.name;
        if (reward.type === 'skin') {
            const skinCfg = CONFIG.skins.find(s => s.id === reward.value);
            displayName = skinCfg?.name ?? reward.value;
        } else if (reward.type === 'bg') {
            const bgCfg = CONFIG.backgrounds.find(b => b.id === reward.value);
            displayName = bgCfg?.name ?? reward.value;
        } else if (reward.type === 'upgrade') {
            const upgCfg = [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades].find(u => u.id === reward.value);
            displayName = `+1 ${upgCfg?.name ?? reward.value}`;
        } else if (reward.type === 'gold') {
            displayName = `${formatNumber(reward.value as number)} Or`;
        }

        return { type: reward.type, value: reward.value, name: displayName, rarity: reward.rarity };
    };
    const fetchLeaderboard = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/leaderboard.php`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            const data = await res.json();
            if (res.ok) return data;
            return null;
        } catch (e) {
            return null;
        }
    }, [token]);
    const claimQuest = (questId: string): Promise<void> => {
        const nextInQueue = claimQueueRef.current.then(async () => {
            const quest = QUESTS.find(q => q.id === questId);
            if (!quest) return;
            if (completedQuestsRef.current.includes(questId)) return;

            const conditionLocale = quest.condition({
                totalGold: totalGoldRef.current,
                inventory: inventoryRef.current,
                unlockedCosmetics: unlockedCosmeticsRef.current
            });
            if (!conditionLocale) return;

            const prevAncientCoins = ancientCoinsRef.current;
            const prevCompletedQuests = [...completedQuestsRef.current];

            ancientCoinsRef.current += quest.rewardPA;
            completedQuestsRef.current = [...completedQuestsRef.current, questId];
            setAncientCoins(ancientCoinsRef.current);
            setCompletedQuests([...completedQuestsRef.current]);

            let currentAuthToken = tokenRef.current;
            if (auth.currentUser) {
                try { currentAuthToken = await auth.currentUser.getIdToken(false); } catch (e) { }
            }

            if (!currentAuthToken) {
                ancientCoinsRef.current = prevAncientCoins;
                completedQuestsRef.current = prevCompletedQuests;
                setAncientCoins(prevAncientCoins);
                setCompletedQuests(prevCompletedQuests);
                return;
            }

            try {
                const res = await fetch(`${API_BASE}/claim_quest.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentAuthToken}`
                    },
                    body: JSON.stringify({ questId })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    ancientCoinsRef.current = data.newAncientCoins;
                    completedQuestsRef.current = data.completedQuests;
                    setAncientCoins(data.newAncientCoins);
                    setCompletedQuests([...data.completedQuests]);
                } else {
                    ancientCoinsRef.current = prevAncientCoins;
                    completedQuestsRef.current = prevCompletedQuests;
                    setAncientCoins(prevAncientCoins);
                    setCompletedQuests(prevCompletedQuests);
                }
            } catch (e) {
                ancientCoinsRef.current = prevAncientCoins;
                completedQuestsRef.current = prevCompletedQuests;
                setAncientCoins(prevAncientCoins);
                setCompletedQuests(prevCompletedQuests);
                console.error('Erreur claimQuest:', e);
            }
        });

        claimQueueRef.current = nextInQueue;
        return nextInQueue;
    };
    const toggleTrackQuest = (questId: string) => {
        let newTracked;
        if (trackedQuestsRef.current.includes(questId)) {
            newTracked = trackedQuestsRef.current.filter(id => id !== questId);
        } else {

            newTracked = [...trackedQuestsRef.current, questId].slice(-2);
        }
        trackedQuestsRef.current = newTracked;
        setTrackedQuests(newTracked);
        syncWithServer(false);
    };
    if (!isInitialized) return <LoaderPirate />;
    return (
        <GameContext.Provider value={{
            token, uid,
            gold, totalGold, ancientCoins, completedQuests, trackedQuests, toggleTrackQuest, inventory, view, setView, forceSync: () => syncWithServer(false), particles, equipped,
            currentGPS, currentClickPower, handleMainClick, buyItem, buyOrEquipCosmetic, unlockedCosmetics, openMysteryBox,
            activateSkill, activeSkills, skillCooldowns,
            comboClicks, comboMultiplier, claimQuest,
            fetchLeaderboard, syncCountdown, lastSyncTime, isLoading,
            userEmail, userPseudo
        }}>
            {isLoading && <LoaderPirate />}
            {!token && <ModalAuth onLoginSuccess={handleLoginSuccess} />}
            {children}
        </GameContext.Provider>
    );
};
export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
    return Math.floor(num).toString();
};

