'use client';
import React from 'react';
import Image from 'next/image';

import { useGame } from '@/context/GameContext';
import { CONFIG, formatNumber } from '@/data/config';
import BarreCompetences from './BarreCompetences';

const CoinDisplay: React.FC = () => {
    const { currentClickPower, handleMainClick, equipped, comboClicks, comboMultiplier, particles } = useGame();

    const [burstParticles, setBurstParticles] = React.useState<{ id: number, tx: string, ty: string, delay: string, rot: string, s: string }[]>([]);

    const activeSkin = CONFIG.skins.find(s => s.id === equipped.skin) || CONFIG.skins[0];

    const SkinIcon = activeSkin.icon;

    const progressPercent = comboClicks >= 150 ? 100 : (comboClicks % 50) / 50 * 100;

    const [isAnimating, setIsAnimating] = React.useState(false);

    const onLocalClick = (e: React.PointerEvent<HTMLDivElement>) => {
        handleMainClick(e);

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 50);

        const newParticles = Array.from({ length: 12 + Math.random() * 8 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * (typeof window !== 'undefined' ? Math.max(window.innerWidth, window.innerHeight) / 1.5 : 400);
            return {
                id: Date.now() + i + Math.random(),
                tx: `${Math.cos(angle) * distance}px`,
                ty: `${Math.sin(angle) * distance}px`,
                delay: `${Math.random() * 0.1}s`,
                rot: `${Math.random() * 360}deg`,
                s: `${0.8 + Math.random() * 0.1}`
            };
        });

        setBurstParticles(prev => [...prev, ...newParticles]);
        setTimeout(() => {
            setBurstParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1600);
    };

    return (
        <div
            onPointerDown={onLocalClick}
            className="absolute inset-0 flex flex-col items-center justify-start pb-2 cursor-pointer"
        >
            <div className="flex-grow flex flex-col items-center justify-center w-full -mt-16">

                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="fixed text-3xl font-times text-white pointer-events-none z-50 animate-float-up"
                        style={{
                            left: p.x - 20,
                            top: p.y - 40,
                        }}
                    >
                        {formatNumber(p.val)}
                    </div>
                ))}



                <div
                    className="relative"
                    style={{ touchAction: 'manipulation', isolation: 'isolate' }}
                >
                    {burstParticles.map(p => (
                        <div
                            key={p.id}
                            className="absolute left-1/2 top-1/2 pointer-events-none z-0 animate-fly-out"
                            style={{
                                '--tx': p.tx,
                                '--ty': p.ty,
                                '--rot': p.rot,
                                '--s': p.s,
                                animationDelay: p.delay,
                            } as React.CSSProperties}
                        >
                            {activeSkin.image ? (
                                <Image src={activeSkin.image} alt="coin" width={60} height={60} className="w-[60px] h-[60px] object-cover rounded-full" />
                            ) : (
                                SkinIcon && <SkinIcon className="w-12 h-12 text-yellow-500" />
                            )}
                        </div>
                    ))}

                    <div
                        className={`w-72 h-72 rounded-full overflow-hidden relative flex items-center justify-center transition-all duration-75 z-10 isolate ${isAnimating ? 'scale-95 brightness-90' : 'scale-100 brightness-100'} ${activeSkin.image ? '' : `border-4 ${activeSkin.border} bg-gradient-to-br ${activeSkin.colors}`}`}
                    >
                        {activeSkin.image ? (
                            <Image
                                src={activeSkin.image}
                                alt={activeSkin.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 288px"
                                priority
                                className="object-cover"
                                draggable={false}
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 rounded-full bg-black/10 mix-blend-overlay" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/aged-paper.png)' }}></div>
                                {SkinIcon && <SkinIcon className="w-40 h-40 text-black/50 stroke-[1.5]" />}

                                <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay" viewBox="0 0 100 100">
                                    <path id="curve" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" fill="transparent" />
                                    <text className="font-pirate text-[11px] fill-black" letterSpacing="3">
                                        <textPath href="#curve">PILLAGE • FORTUNE • GLOIRE •</textPath>
                                    </text>
                                </svg>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div onPointerDown={(e) => e.stopPropagation()}>
                <BarreCompetences />
            </div>
        </div>
    );
};

export default CoinDisplay;
