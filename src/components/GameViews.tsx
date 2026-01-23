'use client';
import React, { useState } from 'react';
import { Crosshair, Anchor, Palette, Mountain } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CONFIG } from '../data/config';
import CoinDisplay from './CoinDisplay';
import ShopItem from './ShopItem';
import CosmeticItem from './CosmeticItem';

export const GameView: React.FC = () => {
    return <CoinDisplay />;
};

export const ShopView: React.FC = () => {
    const [shopTab, setShopTab] = useState<'upgrades' | 'cosmetics'>('upgrades');

    return (
        <div className="absolute inset-0 flex flex-col bg-[#d4c5a3]">
            <div className="absolute inset-0 -z-10 bg-[#d4c5a3]" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 50%, rgba(62, 39, 35, 0.4) 100%)', boxShadow: 'inset 0 0 50px #5d4037' }}></div>

            <div className="p-4 pt-6 text-center relative z-10 flex flex-col gap-4">
                <h2 className="font-pirate text-5xl text-[#3e2723] drop-shadow-sm mb-1 leading-none">Marché Noir</h2>
                <div className="flex bg-[#3e2723]/10 p-1 rounded-lg">
                    <button onClick={() => setShopTab('upgrades')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'upgrades' ? 'bg-[#3e2723] text-[#f3e5ab] shadow-md' : 'text-[#3e2723]/60 hover:bg-[#3e2723]/5'}`}>Améliorations</button>
                    <button onClick={() => setShopTab('cosmetics')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'cosmetics' ? 'bg-[#3e2723] text-[#f3e5ab] shadow-md' : 'text-[#3e2723]/60 hover:bg-[#3e2723]/5'}`}>Apparence</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto scroller p-4 pb-24 space-y-6 z-10">
                {shopTab === 'upgrades' ? (
                    <>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#7f1d1d] border-b border-[#7f1d1d]/20 mb-3 pb-1"><Crosshair className="w-5 h-5" /> Armurerie (Clics)</h3>
                            <div className="grid gap-3">{CONFIG.clickUpgrades.map(item => <ShopItem key={item.id} item={item} type="click" />)}</div>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#1e3a8a] border-b border-[#1e3a8a]/20 mb-3 pb-1 mt-6"><Anchor className="w-5 h-5" /> Équipage (Auto)</h3>
                            <div className="grid gap-3">{CONFIG.autoUpgrades.map(item => <ShopItem key={item.id} item={item} type="auto" />)}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#7f1d1d] border-b border-[#7f1d1d]/20 mb-3 pb-1"><Palette className="w-5 h-5" /> Skins de Pièce</h3>
                            <div className="grid grid-cols-2 gap-3">{CONFIG.skins.map(item => <CosmeticItem key={item.id} item={item} type="skin" />)}</div>
                        </div>
                        {/* Background shop disabled temporarily */}
                        {/* <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#1e3a8a] border-b border-[#1e3a8a]/20 mb-3 pb-1 mt-6"><Mountain className="w-5 h-5" /> Décors</h3>
                            <div className="grid grid-cols-2 gap-3">{CONFIG.backgrounds.map(item => <CosmeticItem key={item.id} item={item} type="bg" />)}</div>
                        </div> */}
                    </>
                )}
            </div>
        </div>
    );
};