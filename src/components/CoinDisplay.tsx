'use client';
import React from 'react';
import { Swords } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { CONFIG, formatNumber } from '@/data/config';
import SkillBar from './SkillBar';

const CoinDisplay: React.FC = () => {
    const { currentClickPower, handleMainClick, equipped } = useGame();

    const activeSkin = CONFIG.skins.find(s => s.id === equipped.skin) || CONFIG.skins[0];
    const activeBg = CONFIG.backgrounds.find(b => b.id === equipped.bg) || CONFIG.backgrounds[0];
    const SkinIcon = activeSkin.icon;

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-start  pb-2">
            {/* Dynamic Background */}
            {/* Background moved to page.tsx */}

            <h1 className="font-pirate  pb-16 text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fde047] to-[#ca8a04] drop-shadow-lg mb-4 tracking-wider animate-pulse-gold pointer-events-none text-center leading-tight">
                ClickCoins
            </h1>

            {/* Container to center the coin in the remaining space */}
            <div className="flex-grow flex flex-col items-center justify-center w-full -mt-16">
                {/* Interactive Coin */}
                <div
                    className="relative group cursor-pointer active:scale-95 transition-transform"
                    onMouseDown={handleMainClick}
                    onTouchStart={handleMainClick}
                >
                    <div className="absolute inset-0 -m-2 opacity-50">
                        <div className="w-full h-full border-2 border-dashed border-white/40 rounded-full animate-[spin_60s_linear_infinite]"></div>
                    </div>

                    <div className={`w-72 h-72 rounded-full relative flex items-center justify-center ${activeSkin.image ? '' : `border-4 ${activeSkin.border} bg-gradient-to-br ${activeSkin.colors}`}`}>
                        {activeSkin.image ? (
                            <img
                                src={activeSkin.image}
                                alt={activeSkin.name}
                                className="w-full h-full object-cover drop-shadow-2xl"
                                draggable="false"
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 rounded-full bg-black/10 mix-blend-overlay" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/aged-paper.png)' }}></div>
                                <SkinIcon className="w-40 h-40 text-black/50 drop-shadow-lg stroke-[1.5]" />

                                <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-60 mix-blend-overlay" viewBox="0 0 100 100">
                                    <path id="curve" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" fill="transparent" />
                                    <text className="font-pirate text-[11px] fill-black" letterSpacing="3">
                                        <textPath href="#curve">PILLAGE • FORTUNE • GLOIRE •</textPath>
                                    </text>
                                </svg>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-12 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex flex-col items-center gap-1 shadow-lg pointer-events-none">
                    <div className="flex items-center gap-2 text-[#facc15] font-pirate text-2xl">
                        <Swords className="w-5 h-5" />
                        <span>{formatNumber(currentClickPower)}</span>
                    </div>
                </div>
            </div>
            <SkillBar />
        </div>
    );
};

export default CoinDisplay;