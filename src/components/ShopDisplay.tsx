'use client';
import React, { useState } from 'react';
import { Crosshair, Anchor, Palette, Mountain, Gift, X, Coins } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CONFIG, formatNumber } from '../data/config';
import ShopItem from './ShopItem';
import CosmeticItem from './CosmeticItem';
import { MysteryBoxItem, Rarity } from '../types';

const ShopDisplay: React.FC = () => {
    const [shopTab, setShopTab] = useState<'upgrades' | 'cosmetics' | 'mystery'>('upgrades');
    const { gold, openMysteryBox } = useGame();

    // État pour la modale de drop
    const [dropResult, setDropResult] = useState<{ name: string; rarity: Rarity; type: string } | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleOpenBox = (box: MysteryBoxItem) => {
        if (gold < box.cost || isAnimating) return;

        setIsAnimating(true);
        // Petite latence pour simuler l'ouverture
        setTimeout(() => {
            try {
                const result = openMysteryBox(box);
                setDropResult({ name: result.name, rarity: result.rarity, type: result.type });
            } catch (e) {
                // Gestion erreur silencieuse ou toast
            }
            setIsAnimating(false);
        }, 1000);
    };

    const closeDropModal = () => setDropResult(null);

    return (
        <div className="absolute inset-0 flex flex-col bg-[#d4c5a3]">
            {/* Fond Parchemin */}
            <div className="absolute inset-0 -z-10 bg-[#d4c5a3]" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 50%, rgba(62, 39, 35, 0.4) 100%)', boxShadow: 'inset 0 0 50px #5d4037' }}></div>

            {/* En-tête Boutique Full Screen */}
            <div className="p-4 pt-safe top-0 z-20 flex flex-col gap-4 bg-gradient-to-b from-[#d4c5a3] to-[#d4c5a3]/90 backdrop-blur-sm sticky shadow-sm">

                <div className="flex items-center justify-between px-2">
                    <h2 className="font-pirate text-4xl text-[#3e2723] drop-shadow-sm leading-none">Marché Noir</h2>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                            <span className="font-pirate text-2xl text-[#3e2723]">{formatNumber(gold)}</span>
                            <Coins className="w-5 h-5 text-[#3e2723]" />
                        </div>
                    </div>
                </div>

                <div className="flex bg-[#3e2723]/10 p-1 rounded-lg">
                    <button onClick={() => setShopTab('upgrades')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'upgrades' ? 'bg-[#3e2723] text-[#f3e5ab] shadow-md' : 'text-[#3e2723]/60 hover:bg-[#3e2723]/5'}`}>Amélio.</button>
                    <button onClick={() => setShopTab('cosmetics')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'cosmetics' ? 'bg-[#3e2723] text-[#f3e5ab] shadow-md' : 'text-[#3e2723]/60 hover:bg-[#3e2723]/5'}`}>Styles</button>
                    <button onClick={() => setShopTab('mystery')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'mystery' ? 'bg-[#3e2723] text-[#f3e5ab] shadow-md' : 'text-[#3e2723]/60 hover:bg-[#3e2723]/5'}`}>Mystère</button>
                </div>
            </div>

            {/* Contenu Scrollable */}
            <div className="flex-grow overflow-y-auto scroller p-4 pb-24 space-y-6 z-10">
                {shopTab === 'upgrades' ? (
                    <>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#7f1d1d] border-b border-[#7f1d1d]/20 mb-3 pb-1"><Crosshair className="w-5 h-5" /> Armurerie (Clics)</h3>
                            <div className="grid grid-cols-2 gap-3">{CONFIG.clickUpgrades.map(item => <ShopItem key={item.id} item={item} type="click" />)}</div>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#1e3a8a] border-b border-[#1e3a8a]/20 mb-3 pb-1 mt-6"><Anchor className="w-5 h-5" /> Équipage (Auto)</h3>
                            <div className="grid gap-3">{CONFIG.autoUpgrades.map(item => <ShopItem key={item.id} item={item} type="auto" />)}</div>
                        </div>
                    </>
                ) : shopTab === 'cosmetics' ? (
                    <>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#7f1d1d] border-b border-[#7f1d1d]/20 mb-3 pb-1"><Palette className="w-5 h-5" /> Skins de Pièce</h3>
                            <div className="grid grid-cols-2 gap-3">{CONFIG.skins.filter(s => s.cost > 0 || true).map(item => <CosmeticItem key={item.id} item={item} type="skin" />)}</div>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 font-pirate text-2xl text-[#1e3a8a] border-b border-[#1e3a8a]/20 mb-3 pb-1 mt-6"><Mountain className="w-5 h-5" /> Décors</h3>
                            <div className="grid grid-cols-2 gap-3">{CONFIG.backgrounds.filter(b => b.cost > 0 || true).map(item => <CosmeticItem key={item.id} item={item} type="bg" />)}</div>
                        </div>
                    </>
                ) : (
                    /* SECTION MYSTÈRE */
                    <div className="space-y-4">
                        <div className="bg-[#3e2723]/5 p-3 rounded-lg border border-[#3e2723]/10 text-center text-[#3e2723]/70 text-sm italic">
                            &quot;Tente ta chance moussaillon ! Certains trésors ne s&apos;achètent pas avec de l&apos;or...&quot;
                        </div>
                        <div className="grid gap-4">
                            {CONFIG.mysteryBoxes.map(box => (
                                <div key={box.id} className="bg-[#f3e5ab] border-2 border-[#3e2723]/30 p-3 rounded-lg shadow-md flex flex-col items-center text-center gap-2 relative overflow-hidden group">
                                    {/* Effet de brillance */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                                    <box.icon className={`w-12 h-12 ${box.id === 'box_legendary' ? 'text-yellow-600' : box.id === 'box_rare' ? 'text-blue-600' : 'text-[#3e2723]'}`} />

                                    <div>
                                        <h4 className="font-pirate text-xl text-[#3e2723]">{box.name}</h4>
                                        <p className="text-[10px] text-[#3e2723]/60 mb-2">{box.description}</p>

                                        {/* Drop Rates Mini */}
                                        <div className="flex gap-1 justify-center text-[9px] font-bold text-[#3e2723]/50">
                                            {box.dropRates.common > 0 && <span className="text-gray-500">Com:{box.dropRates.common}%</span>}
                                            {box.dropRates.rare > 0 && <span className="text-blue-500">Rare:{box.dropRates.rare}%</span>}
                                            {box.dropRates.epic > 0 && <span className="text-purple-600">Epique:{box.dropRates.epic}%</span>}
                                            {box.dropRates.legendary > 0 && <span className="text-yellow-600">Leg:{box.dropRates.legendary}%</span>}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleOpenBox(box)}
                                        disabled={gold < box.cost || isAnimating}
                                        className={`w-full py-2 mt-2 font-bold rounded shadow-lg text-sm transition-all ${gold >= box.cost ? 'bg-[#3e2723] text-[#f3e5ab] hover:scale-[1.02]' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                                    >
                                        {isAnimating ? 'Ouverture...' : `Ouvrir (${formatNumber(box.cost)})`}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* MODALE DE DROP */}
            {dropResult && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeDropModal}>
                    <div className="bg-[#f3e5ab] border-4 border-[#3e2723] p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-[80%] text-center animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <h3 className="font-pirate text-3xl text-[#3e2723]">Butin Trouvé !</h3>

                        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-inner bg-gradient-to-br 
                            ${dropResult.rarity === 'legendary' ? 'from-yellow-300 to-yellow-600 border-yellow-500' :
                                dropResult.rarity === 'epic' ? 'from-purple-300 to-purple-600 border-purple-500' :
                                    dropResult.rarity === 'rare' ? 'from-blue-300 to-blue-600 border-blue-500' :
                                        'from-gray-300 to-gray-500 border-gray-400'}`}>
                            {dropResult.type === 'gold' ? <span className="text-4xl">💰</span> : <Gift className="w-12 h-12 text-white drop-shadow-md" />}
                        </div>

                        <div>
                            <p className={`text-xs uppercase font-bold tracking-widest mb-1
                                ${dropResult.rarity === 'legendary' ? 'text-yellow-600' :
                                    dropResult.rarity === 'epic' ? 'text-purple-600' :
                                        dropResult.rarity === 'rare' ? 'text-blue-600' :
                                            'text-gray-600'}`}>
                                {dropResult.rarity}
                            </p>
                            <p className="font-pirate text-2xl text-[#3e2723]">{dropResult.name}</p>
                        </div>

                        <button onClick={closeDropModal} className="px-6 py-2 bg-[#3e2723] text-[#f3e5ab] font-bold rounded shadow hover:bg-black transition-colors">
                            Récupérer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopDisplay;