'use client';
import React from 'react';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';
import { formatNumber } from '@/data/config';

const Header: React.FC = () => {
    const { gold, currentGPS, currentClickPower, ancientCoins, comboClicks, view } = useGame();
    const multiplier = Math.floor(comboClicks / 25) + 1;


    const progressPercent = multiplier > 1 ? 100 : (comboClicks / 25) * 100;
    const waterInfo =
        multiplier === 1 ? { color: '#00a8e8', opacity: 0.4 } :
            multiplier === 2 ? { color: '#0a9396', opacity: 0.5 } :
                multiplier === 3 ? { color: '#005f73', opacity: 0.6 } :
                    { color: '#023e8a', opacity: 0.7 };

    if (view === 'shop') return null;

    return (
        <header onPointerDown={(e) => e.stopPropagation()} className="flex-none px-4 lg:px-6 mt-2 w-full pt-safe relative z-40">
            <div className="max-w-md lg:max-w-5xl mx-auto relative p-4 lg:p-3 flex flex-col gap-1 lg:gap-2 overflow-hidden border border-white/25 bg-black/40 backdrop-blur-sm rounded-xl transition-colors duration-500 shadow-lg shadow-black/20">

                <div
                    className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none z-0"
                    style={{
                        transform: `translateY(${100 - progressPercent}%)`,
                        backgroundColor: waterInfo.color,
                        opacity: waterInfo.opacity
                    }}
                >

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />


                    <div className="absolute top-0 left-0 w-[200%] h-20 -translate-y-full overflow-hidden">
                        <svg
                            className="absolute bottom-0 left-0 w-full h-12 transition-all duration-1000"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            style={{
                                animation: 'waveMove 8s linear infinite',
                                fill: waterInfo.color
                            }}
                        >
                            <path d="M0,60 C300,0 300,120 600,60 C900,0 900,120 1200,60 V120 H0 Z" />
                        </svg>
                    </div>

                    <div className="absolute top-0 left-0 w-[200%] h-20 -translate-y-full overflow-hidden">
                        <svg
                            className="absolute bottom-0 left-0 w-full h-12 opacity-50 transition-all duration-1000"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            style={{
                                animation: 'waveMove 12s linear infinite reverse',
                                fill: waterInfo.color
                            }}
                        >
                            <path d="M0,60 C300,120 300,0 600,60 C900,120 900,0 1200,60 V120 H0 Z" />
                        </svg>
                    </div>
                </div>

                <div className="flex relative z-10 items-center divide-x divide-white/10">
                    <div className="flex-1 flex flex-col items-center px-0.5">
                        <span className="text-[7px] lg:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Trésor</span>
                        <div className="flex items-center gap-1 lg:gap-3">
                            <Image src="/iconduHeader.png" alt="Coin" width={16} height={16} className="object-contain w-3.5 h-3.5 lg:w-8 lg:h-8" />
                            <span className="text-[15px] lg:text-2xl font-times text-white leading-none">
                                <span className="lg:hidden">{formatNumber(gold)}</span>
                                <span className="hidden lg:inline">{Math.floor(gold).toLocaleString('fr-FR')}</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-0.5">
                        <span className="text-[7px] lg:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Antiques</span>
                        <div className="flex items-center gap-1 lg:gap-3">
                            <Image src="/pieceAntique.png" alt="PA" width={16} height={16} className="object-contain w-3.5 h-3.5 lg:w-8 lg:h-8" />
                            <span className="text-[15px] lg:text-2xl font-times text-white leading-none">{formatNumber(ancientCoins)}</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-0.5">
                        <span className="text-[7px] lg:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Clic</span>
                        <div className="flex items-baseline gap-0.5 lg:gap-1.5">
                            <span className="text-[15px] lg:text-2xl font-times text-white leading-none">{formatNumber(currentClickPower)}</span>
                            {multiplier > 1 && (
                                <span className="text-[9px] lg:text-sm font-black text-yellow-400 italic animate-pulse">x{multiplier}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-0.5">
                        <span className="text-[7px] lg:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Revenu</span>
                        <div className="flex items-center gap-1 lg:gap-3">
                            <span className="text-[15px] lg:text-2xl font-times text-white leading-none">
                                <span className="lg:hidden">{formatNumber(currentGPS)}</span>
                                <span className="hidden lg:inline">{currentGPS.toLocaleString('fr-FR')}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
