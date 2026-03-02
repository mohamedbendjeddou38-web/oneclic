'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';
import { CONFIG, getCost } from '@/data/config';
import { Menu, ScrollText } from 'lucide-react';
import VoletClassement from './VoletClassement';
import ModalQuetes from './ModalQuetes';

const Navbar: React.FC = () => {
    const { view, setView, gold, inventory, token } = useGame();
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [isQuetesOpen, setIsQuetesOpen] = useState(false);

    if (!token) return null;

    const canAffordAny = [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades].some(i => {
        return gold >= getCost(i, inventory[i.id] || 0);
    });

    return (
        <>
            <nav onPointerDown={(e) => e.stopPropagation()} className="flex-none z-[100] px-6 pb-2">
                <div className="backdrop-blur-md border-2 border-white/20 bg-black/40 shadow-xl flex overflow-hidden relative max-w-lg mx-auto items-center rounded-2xl">


                    <button
                        onClick={() => setView('game')}
                        className={`flex-1 flex py-3 flex-col items-center justify-center relative transition-all ${view === 'game' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                        <Image
                            src="/iconNavire.png"
                            alt="Navire"
                            width={50}
                            height={50}
                            className={`w-10 h-10 transition-all ${view === 'game' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}
                        />
                        <span className={`text-[9px] mt-1 tracking-[0.2em] font-black uppercase ${view === 'game' ? 'text-white' : 'text-white/30'}`}>Navire</span>
                    </button>


                    <button
                        onClick={() => setView('shop')}
                        className={`flex-1 flex py-3 flex-col items-center justify-center relative transition-all ${view === 'shop' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                        {canAffordAny && <div className="absolute top-2 right-1/4 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full animate-bounce"></div>}
                        <Image
                            src="/iconMarché.png"
                            alt="Marché"
                            width={50}
                            height={50}
                            className={`w-10 h-10 transition-all ${view === 'shop' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}
                        />
                        <span className={`text-[9px] mt-1 tracking-[0.2em] font-black uppercase ${view === 'shop' ? 'text-white' : 'text-white/30'}`}>Marché</span>
                    </button>


                    <button
                        onClick={() => setIsQuetesOpen(true)}
                        className="flex-1 flex py-3 flex-col items-center justify-center relative transition-all hover:bg-white/5 border-l border-white/10"
                    >
                        <ScrollText size={30} strokeWidth={1.5} className="text-white/40 mb-1" />
                        <span className="text-[9px] mt-2 tracking-[0.2em] font-black uppercase text-white/30">Quêtes</span>
                    </button>


                    <button
                        onClick={() => setIsLeaderboardOpen(true)}
                        className="p-4 text-white/50 hover:text-white transition-colors bg-white/5 border-l border-white/10 group"
                        title="Classement"
                    >
                        <Menu size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </nav>

            <VoletClassement isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
            <ModalQuetes isOpen={isQuetesOpen} onClose={() => setIsQuetesOpen(false)} />
        </>
    );
};

export default Navbar;
