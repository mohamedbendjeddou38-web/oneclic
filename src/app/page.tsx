'use client';

import React from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { GameView, ShopView } from '@/components/GameViews';

const ContentRouter: React.FC = () => {
    const { view } = useGame();
    return (
        <>
            <div className={`absolute inset-0 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${view === 'game' ? 'translate-x-0' : '-translate-x-full'}`}>
                <GameView />
            </div>
            <div className={`absolute inset-0 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${view === 'shop' ? 'translate-x-0' : 'translate-x-full'}`}>
                <ShopView />
            </div>
        </>
    );
};

export default function Home() {
    return (
        <GameProvider>
            <div className="h-screen w-full bg-black text-white font-serif overflow-hidden relative flex flex-col select-none touch-manipulation">

                {/* Background global */}
                <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
                    <img src="/background1.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <Header />

                <main className="flex-grow relative w-full max-w-md mx-auto overflow-hidden">
                    <ContentRouter />
                </main>

                <Navbar />
            </div>
        </GameProvider>
    );
}