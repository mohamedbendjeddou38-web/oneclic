'use client';
import React from 'react';
import Image from 'next/image';
import { Coins } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { UpgradeItem } from '@/types';
import { getCost, formatNumber } from '@/data/config';

interface ItemBoutiqueProps {
    item: UpgradeItem;
    type: 'click' | 'auto';
}

const ItemBoutique: React.FC<ItemBoutiqueProps> = ({ item, type }) => {
    const { inventory, gold, ancientCoins, buyItem } = useGame();
    const [showOverlay, setShowOverlay] = React.useState(false);
    const count = inventory[item.id] || 0;
    const cost = getCost(item, count);
    const currency = item.currency || 'gold';
    const canAfford = currency === 'pa' ? ancientCoins >= cost : gold >= cost;
    const Icon = item.icon;

    const handleBuy = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (cost >= 0 && canAfford) {
            buyItem(item);
        }
    };

    if (type === 'click' && item.image) {
        return (
            <>
                <div
                    onClick={() => setShowOverlay(true)}
                    className="relative transition-all select-none cursor-pointer active:scale-[0.98] rounded-xl overflow-hidden w-full max-w-[220px] mx-auto pb-4"
                >
                    <div className="relative w-full aspect-[7/10]">
                        <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 300px" className="object-contain" />
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-black/10 z-10 pointer-events-none">
                        Niv. <span className="font-times">{count}</span>
                    </div>
                </div>

                {showOverlay && (
                    <div
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                        onClick={() => setShowOverlay(false)}
                    >
                        <div
                            className="relative w-full max-w-[280px] border-4 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col items-center"
                            style={{ backgroundColor: 'var(--theme-title)', borderColor: '#111' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowOverlay(false)}
                                className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors font-bold"
                            >
                                ✕
                            </button>

                            <div className="w-full pt-6 pb-2 flex flex-col items-center">
                                <div className="w-48 h-72 relative rounded-xl overflow-hidden shadow-xl border-2 border-white/10 transition-transform duration-500">
                                    <Image src={item.image} alt={item.name} fill sizes="192px" className="object-contain" />
                                </div>
                            </div>

                            <div className="w-full p-5 flex flex-col gap-3">
                                <div className="text-center">
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                                            <span className="text-[10px] text-white/50 uppercase font-black block">Niveau</span>
                                            <span className="text-xl font-times text-white">{count}</span>
                                        </div>
                                        <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                                            <span className="text-[10px] text-white/50 uppercase font-black block">Effet Actif</span>
                                            <span className="text-sm font-pirate text-white leading-tight flex items-center justify-center h-7">
                                                {item.skillConfig?.type === 'buff_click' ? 'Boost Clic' : 'Boost Revenus'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {cost >= 0 && (
                                    <button
                                        onClick={handleBuy}
                                        disabled={!canAfford}
                                        className={`w-full py-2.5 rounded-xl font-pirate text-xl flex items-center justify-center gap-1 transition-all ${canAfford ? 'bg-[#FAFAFA] text-black active:scale-[0.98] shadow-lg' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        Améliorer <span className="font-times ml-1">{Math.floor(cost).toLocaleString('fr-FR')}</span> <Image src="/pieceAntique.png" alt="Pièces Antiques" width={16} height={16} className="w-4 h-4 object-contain" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div
            onClick={handleBuy}
            className={`relative border-1 px-4 pt-3 pb-5 rounded-xl shadow-[5px_5px_0px_rgba(255,255,255,0.05)] transition-all select-none cursor-pointer flex items-center justify-between overflow-hidden group active:scale-[0.98] ${canAfford ? '' : 'opacity-70 grayscale cursor-not-allowed'}`}
            style={{
                backgroundColor: '#0a0a0a',
                borderColor: 'rgba(255,255,255,0.2)',
                borderLeft: `4px solid var(--rarity-${item.rarity || 'common'})`
            }}
        >

            <div className="flex items-center gap-3 relative z-10 w-full">
                <div className="w-16 h-16 mr-2 flex items-center justify-center flex-shrink-0 relative">
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className={`object-contain ${['auto_1', 'auto_2', 'auto_3', 'auto_4', 'auto_5', 'auto_6', 'auto_7', 'auto_8', 'auto_9'].includes(item.id) ? 'scale-[2.2]' : 'scale-[1.5]'}`}
                        />
                    ) : (
                        Icon && <Icon className="w-10 h-10 text-white/80" />
                    )}
                </div>
                <div className="flex flex-col">
                    <h4 className="font-pirate text-2xl leading-none text-white">{item.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1.5 font-bold text-lg" style={{ color: canAfford ? '#fff' : '#555' }}>
                        <Image src={currency === 'pa' ? "/pieceAntique.png" : "/iconduHeader.png"} alt="Devise" width={16} height={16} className="w-4 h-4 object-contain" />
                        <span className="font-times tracking-tighter">{Math.floor(cost).toLocaleString('fr-FR')}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center relative z-10">
                <div className="flex items-baseline gap-1">
                    <span className="text-[9px] uppercase font-black text-[#555] tracking-widest">LVL</span>
                    <span className="text-xl font-times text-white">{count}</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-[9px] uppercase font-black text-[#555] tracking-widest">{type === 'click' ? 'HIT' : 'CPS'}</span>
                    <span className="text-sm font-times text-white">+{formatNumber(item.basePower)}</span>
                </div>
            </div>
        </div>
    );
};

export default ItemBoutique;
