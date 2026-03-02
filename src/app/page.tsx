'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import CoinDisplay from '@/components/CoinDisplay';
import Boutique from '@/components/Boutique';
import WidgetQuetes from '@/components/WidgetQuetes';
import { CONFIG } from '@/data/config';
const BackgroundLayer: React.FC = () => {
    const { equipped } = useGame();
    const activeBg = CONFIG.backgrounds.find(b => b.id === equipped.bg) || CONFIG.backgrounds[0];
    const imageSrc = activeBg.image || '/background1.png';
    return (
        <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none transition-opacity duration-500">
            <Image
                key={imageSrc}
                src={imageSrc}
                alt="Background"
                fill
                priority
                className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>
    );
};
const ShopOverlay: React.FC = () => {
    const { view } = useGame();
    if (view !== 'shop') return null;

    return (
        <div className="fixed inset-0 z-[90] animate-in slide-in-from-bottom duration-300">
            <Boutique />
        </div>
    );
};
export default function Home() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsMounted(true), 0);
    }, []);
    if (!isMounted) {
        return <div className="h-screen w-full bg-black text-white" />;
    }
    return (
        <div className="h-[100dvh] w-full bg-black text-white font-serif overflow-hidden relative flex flex-col select-none touch-manipulation">
            <h1 className="sr-only">OneClic - Jeu de Clicker Pirate Gratuit </h1>
            <BackgroundLayer />
            <div className="fixed inset-0 z-[10]">
                <CoinDisplay />
            </div>

            <Header />
            <WidgetQuetes />



            <Navbar />

            <ShopOverlay />
        </div>
    );
}
