'use client';
import React from 'react';
import { useGame } from '@/context/GameContext';
import { formatNumber } from '@/data/config';

const ParticlesOverlay: React.FC = () => {
    const { particles } = useGame();
    return (
        <>
            {particles.map(p => (
                <div key={p.id} className="absolute font-pirate text-[#fde047] text-3xl drop-shadow-md pointer-events-none animate-float-up z-50" style={{ left: p.x, top: p.y - 50 }}>
                    +{formatNumber(p.val)}
                </div>
            ))}
        </>
    );
};

export default ParticlesOverlay;