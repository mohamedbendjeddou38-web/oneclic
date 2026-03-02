'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Crosshair, Anchor, Palette, Mountain, Gift, Coins, ChevronDown, ChevronRight } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { CONFIG, formatNumber } from '@/data/config';
import ItemBoutique from './ItemBoutique';
import ItemCosmetique from './ItemCosmetique';
import { MysteryBoxItem, Rarity } from '@/types';

const Boutique: React.FC = () => {
    const [shopTab, setShopTab] = useState<'shop' | 'mystery'>('shop');
    const { gold, ancientCoins, openMysteryBox } = useGame();


    const [dropResult, setDropResult] = useState<{ name: string; rarity: string; type: string; image?: string } | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);


    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        click: false,
        auto: false,
        skin: false,
        bg: false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleOpenBox = async (box: MysteryBoxItem) => {
        if (gold < box.cost || isAnimating) return;

        setIsAnimating(true);

        try {
            const result = await openMysteryBox(box);
            if (result) {

                let image: string | undefined;
                if (result.type === 'upgrade') {
                    const upg = [...CONFIG.clickUpgrades, ...CONFIG.autoUpgrades].find(u => u.id === result.value);
                    image = upg?.image;
                } else if (result.type === 'skin') {
                    const skin = CONFIG.skins.find(s => s.id === result.value);
                    image = skin?.image;
                } else if (result.type === 'bg') {
                    const bg = CONFIG.backgrounds.find(b => b.id === result.value);
                    image = bg?.image;
                }
                setDropResult({ name: result.name, rarity: result.rarity, type: result.type, image });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsAnimating(false);
        }
    };

    const closeDropModal = () => setDropResult(null);

    return (
        <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: 'var(--theme-shop-bg)' }}>

            <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'var(--theme-shop-bg)', backgroundImage: 'radial-gradient(circle at center, transparent 50%, rgba(62, 39, 35, 0.4) 100%)', boxShadow: 'inset 0 0 50px #5d4037' }}></div>


            <div className="p-4 md:px-[100px] pt-8 top-0 z-20 flex flex-col gap-4 backdrop-blur-sm sticky shadow-sm" style={{ background: 'linear-gradient(to bottom, var(--theme-shop-bg), color-mix(in srgb, var(--theme-shop-bg) 90%, transparent))' }}>

                <div className="flex items-center justify-between px-2">
                    <h2 className="font-pirate text-3xl md:text-4xl text-white leading-none">Marché Noir</h2>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                            <span className="font-times text-xl md:text-2xl text-white">{Math.floor(gold).toLocaleString('fr-FR')}</span>
                            <Image src="/iconduHeader.png" alt="Pièces" width={20} height={20} className="w-5 h-5 object-contain" />
                        </div>
                        {ancientCoins > 0 && (
                            <div className="flex items-center gap-1 opacity-80 scale-90 origin-right">
                                <span className="font-times text-lg md:text-xl text-white">{Math.floor(ancientCoins).toLocaleString('fr-FR')}</span>
                                <Image src="/pieceAntique.png" alt="Pièces Antiques" width={18} height={18} className="w-4 h-4 object-contain" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex bg-white/5 p-1 rounded-lg">
                    <button onClick={() => setShopTab('shop')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'shop' ? 'shadow-md' : 'text-white/50 hover:bg-white/10 hover:text-white'}`} style={shopTab === 'shop' ? { backgroundColor: '#FAFAFA', color: 'var(--theme-title)' } : {}}>Boutique</button>
                    <button onClick={() => setShopTab('mystery')} className={`flex-1 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${shopTab === 'mystery' ? 'shadow-md' : 'text-white/50 hover:bg-white/10 hover:text-white'}`} style={shopTab === 'mystery' ? { backgroundColor: '#FAFAFA', color: 'var(--theme-title)' } : {}}>Mystère</button>
                </div>
            </div>


            <div className="flex-grow overflow-y-auto scroller p-4 md:px-[100px] pb-40 space-y-6 z-10">
                {shopTab === 'shop' ? (
                    <>

                        <div>
                            <h3
                                onClick={() => toggleSection('click')}
                                className="flex items-center gap-2 font-pirate text-xl md:text-2xl border-b border-opacity-20 mb-3 pb-1 cursor-pointer hover:opacity-80 transition-opacity select-none"
                                style={{ color: 'var(--theme-light)', borderColor: 'var(--theme-light)' }}
                            >
                                {expandedSections.click ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                Armurerie (Clics)
                            </h3>
                            {expandedSections.click && (
                                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {CONFIG.clickUpgrades.map(item => <ItemBoutique key={item.id} item={item} type="click" />)}
                                </div>
                            )}
                        </div>


                        <div>
                            <h3
                                onClick={() => toggleSection('auto')}
                                className="flex items-center gap-2 font-pirate text-2xl border-b border-opacity-20 mb-3 pb-1 mt-2 cursor-pointer hover:opacity-80 transition-opacity select-none"
                                style={{ color: 'var(--theme-light)', borderColor: 'var(--theme-light)' }}
                            >
                                {expandedSections.auto ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                Équipage (Auto)
                            </h3>
                            {expandedSections.auto && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">{CONFIG.autoUpgrades.map(item => <ItemBoutique key={item.id} item={item} type="auto" />)}</div>
                            )}
                        </div>


                        <div>
                            <h3
                                onClick={() => toggleSection('skin')}
                                className="flex items-center gap-2 font-pirate text-2xl border-b border-opacity-20 mb-3 pb-1 mt-2 cursor-pointer hover:opacity-80 transition-opacity select-none"
                                style={{ color: 'var(--theme-light)', borderColor: 'var(--theme-light)' }}
                            >
                                {expandedSections.skin ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                Skins de Pièce
                            </h3>
                            {expandedSections.skin && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 animate-in fade-in slide-in-from-top-2 duration-200">{CONFIG.skins.filter(s => s.cost > 0 || true).map(item => <ItemCosmetique key={item.id} item={item} type="skin" />)}</div>
                            )}
                        </div>


                        <div>
                            <h3
                                onClick={() => toggleSection('bg')}
                                className="flex items-center gap-2 font-pirate text-2xl border-b border-opacity-20 mb-3 pb-1 mt-2 cursor-pointer hover:opacity-80 transition-opacity select-none"
                                style={{ color: 'var(--theme-light)', borderColor: 'var(--theme-light)' }}
                            >
                                {expandedSections.bg ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                Décors
                            </h3>
                            {expandedSections.bg && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 animate-in fade-in slide-in-from-top-2 duration-200">{CONFIG.backgrounds.filter(b => b.cost > 0 || true).map(item => <ItemCosmetique key={item.id} item={item} type="bg" />)}</div>
                            )}
                        </div>
                    </>
                ) : (

                    <div className="space-y-4">
                        <p className="text-center font-pirate text-white/40 text-sm italic px-4">
                            "Tente ta chance moussaillon ! Certains trésors ne s'achètent pas avec de l'or..."
                        </p>

                        <div className="grid gap-4 md:grid-cols-3">
                            {CONFIG.mysteryBoxes.map(box => {
                                const canAfford = gold >= box.cost;
                                return (
                                    <div
                                        key={box.id}
                                        onClick={() => handleOpenBox(box)}
                                        className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all select-none text-center
                                            ${canAfford && !isAnimating
                                                ? 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 cursor-pointer active:scale-[0.98]'
                                                : 'border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed'
                                            }`}
                                    >

                                        {box.image ? (
                                            <div className={`relative w-36 h-36 flex-shrink-0 transition-transform duration-300 ${canAfford && !isAnimating ? 'hover:scale-105' : ''}`}>
                                                <Image src={box.image} alt={box.name} fill sizes="144px" className="object-contain" />
                                            </div>
                                        ) : (
                                            box.icon && <box.icon className="w-20 h-20 flex-shrink-0 text-white/60" />
                                        )}


                                        <div className="flex flex-col gap-2 w-full">
                                            <h3 className="font-pirate text-white text-2xl leading-none">{box.name}</h3>


                                            <div className="flex gap-2 flex-wrap justify-center">
                                                {box.dropRates.common > 0 && (
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-300 border border-gray-500/30 uppercase tracking-wide">
                                                        <span className="font-times text-white">{box.dropRates.common}%</span> Com.
                                                    </span>
                                                )}
                                                {box.dropRates.rare > 0 && (
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wide">
                                                        <span className="font-times text-white">{box.dropRates.rare}%</span> Rare
                                                    </span>
                                                )}
                                                {box.dropRates.epic > 0 && (
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wide">
                                                        <span className="font-times text-white">{box.dropRates.epic}%</span> Épic
                                                    </span>
                                                )}
                                                {box.dropRates.legendary > 0 && (
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 uppercase tracking-wide">
                                                        <span className="font-times text-white">{box.dropRates.legendary}%</span> Lég.
                                                    </span>
                                                )}
                                            </div>


                                            <button
                                                disabled={!canAfford || isAnimating}
                                                className={`w-full py-2 rounded-xl font-pirate text-xl tracking-widest flex items-center justify-center gap-1.5 transition-all outline-none border-none shadow-md mt-1
                                                    ${canAfford && !isAnimating
                                                        ? 'bg-[#FAFAFA] text-black hover:scale-[1.02] hover:shadow-lg'
                                                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                                                    }`}
                                            >
                                                {isAnimating ? '...' : (
                                                    <>
                                                        <span className="font-times">{formatNumber(box.cost)}</span>
                                                        <Image src="/iconduHeader.png" alt="Pièces" width={18} height={18} className="w-4 h-4 object-contain" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>


            {dropResult && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeDropModal}>
                    <div className="relative z-10 w-full max-w-[320px] bg-[#0a0a0a] border border-white/20 p-8 rounded-2xl flex flex-col items-center gap-6 text-center animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>

                        <div className="text-center">
                            <h3 className="font-pirate text-white text-3xl">BUTIN TROUVÉ !</h3>
                            <p className="text-[#444] text-[8px] uppercase tracking-[0.3em] mt-1 font-black">
                                Votre butin est arrivé !
                            </p>
                        </div>

                        <div className={`w-32 h-32 rounded-xl flex items-center justify-center border-2 shadow-2xl bg-[#111]
                            ${dropResult.rarity === 'legendary' ? 'border-yellow-500 shadow-yellow-500/20' :
                                dropResult.rarity === 'epic' ? 'border-purple-500 shadow-purple-500/20' :
                                    dropResult.rarity === 'rare' ? 'border-blue-500 shadow-blue-500/20' :
                                        'border-gray-500 shadow-gray-500/20'}`}>
                            {dropResult.type === 'gold' ? (
                                <span className="text-6xl">💰</span>
                            ) : dropResult.image ? (
                                <div className="relative w-40 h-40">
                                    <Image src={dropResult.image} alt={dropResult.name} fill className="object-contain" />
                                </div>
                            ) : (
                                <div className="relative w-20 h-20">
                                    <Gift className="w-full h-full text-white" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <p className="font-marker text-white text-xl uppercase tracking-tighter">{dropResult.name}</p>
                            <span className={`text-[10px] font-black px-3 py-0.5 rounded-full border uppercase tracking-widest
                                ${dropResult.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                                    dropResult.rarity === 'epic' ? 'bg-purple-500/20 text-purple-500 border-purple-500/30' :
                                        dropResult.rarity === 'rare' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                                            'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                                {dropResult.rarity}
                            </span>
                        </div>

                        <button
                            onClick={closeDropModal}
                            className="w-full py-2.5 bg-[#FAFAFA] text-black font-pirate text-2xl uppercase tracking-widest rounded-xl hover:scale-[1.03] active:scale-95 transition-all border-none outline-none"
                        >
                            RÉCUPÉRER
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Boutique;
