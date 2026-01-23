'use client';
import React from 'react';
import { ShipWheel, ScrollText } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { CONFIG, getCost } from '@/data/config';

const Navbar: React.FC = () => {
    const { view, setView, gold, inventory } = useGame();

    const canAffordAny = [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades].some(i => {
        return gold >= getCost(i.baseCost, inventory[i.id] || 0);
    });

    return (
        <nav className="flex-none z-50 px-6 pb-6 pt-2">
            <div className="bg-[#3e2723] border-2 border-[#a1887f]/30 rounded-2xl shadow-2xl flex overflow-hidden relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-white/5 opacity-50"></div>

                <button
                    onClick={() => setView('game')}
                    className={`flex-1 py-4 flex flex-col items-center justify-center relative transition-colors ${view === 'game' ? 'bg-black/20' : ''}`}
                >
                    <ShipWheel className={`w-8 h-8 transition-colors ${view === 'game' ? 'text-[#facc15]' : 'text-[#d4c5a3]/60'}`} />
                    <span className={`text-[10px] font-bold mt-1 tracking-widest uppercase ${view === 'game' ? 'text-white' : 'text-[#d4c5a3]/60'}`}>Navire</span>
                </button>

                <div className="w-[2px] bg-[#a1887f]/20 my-2"></div>

                <button
                    onClick={() => setView('shop')}
                    className={`flex-1 py-4 flex flex-col items-center justify-center relative transition-colors ${view === 'shop' ? 'bg-black/20' : ''}`}
                >
                    {canAffordAny && <div className="absolute top-3 right-1/3 w-3 h-3 bg-red-600 border-2 border-white rounded-full animate-bounce"></div>}
                    <ScrollText className={`w-8 h-8 transition-colors ${view === 'shop' ? 'text-[#facc15]' : 'text-[#d4c5a3]/60'}`} />
                    <span className={`text-[10px] font-bold mt-1 tracking-widest uppercase ${view === 'shop' ? 'text-white' : 'text-[#d4c5a3]/60'}`}>Marché</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;