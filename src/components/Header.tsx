'use client';
import React from 'react';
import { Coins } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../data/config';

const Header: React.FC = () => {
    const { gold, currentGPS } = useGame();

    return (
        <header className="flex-none p-6 mt-2 w-full bg-gradient-to-b from-black/30 to-transparent pt-safe">
            <div className="max-w-md mx-auto relative bg-[#3e2723]/10 border border-[#ffffff]/20 rounded-lg p-3 shadow-sm flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] text-white-400 uppercase tracking-widest font-bold mb-1">Trésor</span>
                    <div className="flex items-center justify-center gap-2">
                        <div className="relative">
                            <Coins className="text-yellow-400 w-10 h-10 drop-shadow-md" />
                            <div className="absolute inset-0 animate-ping opacity-20 bg-yellow-400 rounded-full"></div>
                        </div>
                        <span className="text-3xl font-pirate text-yellow-400 drop-shadow-md tracking-wide">{formatNumber(gold)}</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-white-400  uppercase tracking-widest font-bold mb-4">Revenu / Sec</span>
                    <div className="text-2xl font-pirate text-yellow-400 drop-shadow-md">+{formatNumber(currentGPS)}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;