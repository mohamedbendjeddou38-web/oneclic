'use client';
import React from 'react';
import { Coins } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../data/config';

const Header: React.FC = () => {
    const { gold, currentGPS } = useGame();

    return (
        <header className="flex-none p-3 z-30 w-full bg-gradient-to-b from-black/30 to-transparent pt-safe">
            <div className="max-w-md mx-auto relative bg-[#3e2723]/10 border border-[#a1887f]/20 rounded-lg p-3 shadow-sm flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] text-[#a1887f] uppercase tracking-widest font-bold mb-1 opacity-70">Trésor</span>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Coins className="text-yellow-400 w-8 h-8 drop-shadow-md" />
                            <div className="absolute inset-0 animate-ping opacity-20 bg-yellow-400 rounded-full"></div>
                        </div>
                        <span className="text-3xl font-pirate text-[#fde047] drop-shadow-md tracking-wide">{formatNumber(gold)}</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-[#a1887f] uppercase tracking-widest font-bold mb-1 opacity-70">Revenu / Sec</span>
                    <div className="text-xl font-pirate text-green-400 drop-shadow-md">+{formatNumber(currentGPS)}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;