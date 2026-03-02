'use client';

import React from 'react';

export const LoaderPirate = () => {
    const segments = Array.from({ length: 12 });

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
            <div className="relative flex flex-col items-center">

                {}
                <div className="relative w-32 h-32 mb-12">
                    {segments.map((_, i) => (
                        <div
                            key={i}
                            className="loader-segment absolute left-1/2 top-2 w-1 h-5 bg-white/20 rounded-full"
                            style={{
                                transformOrigin: '0px 56px',
                                transform: `rotate(${i * 30}deg)`,
                                animationDelay: `${i * 0.125}s`,
                            }}
                        />
                    ))}
                </div>

                {}
                <div className="loader-text text-2xl text-white uppercase select-none font-pirate">
                    Navigation
                </div>

                {}
                <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
        </div>
    );
};

