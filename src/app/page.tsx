'use client';

import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import CoinDisplay from '../components/CoinDisplay';
import ShopDisplay from '../components/ShopDisplay';
import { CONFIG } from '../data/config';

const ContentRouter: React.FC = () => {
    const { view } = useGame();
    return (
        <>
            <div className={`absolute inset-0 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${view === 'game' ? 'translate-x-0' : '-translate-x-full'}`}>
                <CoinDisplay />
            </div>
            <div className={`absolute inset-0 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${view === 'shop' ? 'translate-x-0' : 'translate-x-full'}`}>
                <ShopDisplay />
            </div>
        </>
    );
};

const BackgroundLayer: React.FC = () => {
    const { equipped } = useGame();
    const activeBg = CONFIG.backgrounds.find(b => b.id === equipped.bg) || CONFIG.backgrounds[0];
    const imageSrc = activeBg.image || '/background1.png';

    return (
        <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none transition-opacity duration-500">
            <img
                key={imageSrc}
                src={imageSrc}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>
    );
};

const ShopOverlay: React.FC = () => {
    const { view } = useGame();
    if (view !== 'shop') return null;

    return (
        <div className="fixed inset-0 z-[40] animate-in slide-in-from-bottom duration-300">
            <ShopDisplay />
        </div>
    );
};

export default function Home() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-screen w-full bg-black text-white" />;
    }

    return (
        <GameProvider>
            <div className="h-screen w-full bg-black text-white font-serif overflow-hidden relative flex flex-col select-none touch-manipulation">

                <BackgroundLayer />

                <Header />

                <main className="flex-grow relative w-full max-w-md mx-auto overflow-hidden">
                    <div className="absolute inset-0">
                        <CoinDisplay />
                    </div>
                </main>

                <Navbar />

                <ShopOverlay />
            </div>
        </GameProvider>
    );
}