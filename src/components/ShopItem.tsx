'use client';
import React from 'react';
import { Coins } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { UpgradeItem } from '@/types';
import { getCost, formatNumber } from '@/data/config';

interface ShopItemProps {
    item: UpgradeItem;
    type: 'click' | 'auto';
}

const ShopItem: React.FC<ShopItemProps> = ({ item, type }) => {
    const { inventory, gold, buyItem } = useGame();
    const [showOverlay, setShowOverlay] = React.useState(false);
    const count = inventory[item.id] || 0;
    const cost = getCost(item, count);
    const canAfford = gold >= cost;
    const Icon = item.icon;

    const handleBuy = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (cost >= 0 && canAfford) {
            buyItem(item);
        }
    };

    if (item.image) {
        return (
            <>
                <div
                    onClick={() => setShowOverlay(true)}
                    className={`relative flex flex-col bg-[#f3e5ab] border-2 rounded-lg shadow-md transition-all select-none overflow-hidden hover:shadow-xl hover:-translate-y-1 cursor-pointer border-[#3e2723]/30`}
                >
                    <div className="aspect-[3/4] relative overflow-hidden bg-black/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                            <h4 className="font-pirate text-sm text-white leading-tight drop-shadow-md">{item.name}</h4>
                            <div className="flex justify-between items-end mt-1">
                                <span className="text-[9px] text-white/80 font-bold uppercase tracking-tighter">NIV. {count}</span>
                                <span className="text-[10px] text-yellow-400 font-bold">+{formatNumber(item.basePower)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-1.5 text-center bg-[#3e2723]/5">
                        <span className="text-[8px] font-bold text-[#3e2723]/40 uppercase tracking-widest">Voir Détails</span>
                    </div>
                </div>

                {showOverlay && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 p-4 animate-in fade-in duration-300"
                        onClick={() => setShowOverlay(false)}
                    >
                        <div
                            className="relative w-full max-w-sm bg-[#f3e5ab] border-[6px] border-[#3e2723] rounded-[30px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col items-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowOverlay(false)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#3e2723]/20 hover:bg-[#3e2723] text-[#3e2723] hover:text-[#f3e5ab] rounded-full flex items-center justify-center transition-colors font-bold"
                            >
                                ✕
                            </button>

                            <div className="w-full pt-4 pb-2 flex flex-col items-center bg-[#3e2723]/5 border-b border-[#3e2723]/10">
                                <div className="w-60 h-90 relative rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-4 border-white/20 transform hover:scale-105 transition-transform duration-500">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="w-full p-6 flex flex-col gap-2">
                                <div className="text-center">
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div className="bg-[#3e2723]/10 p-2 rounded-lg border border-[#3e2723]/20">
                                            <span className="text-[10px] text-[#3e2723]/60 uppercase font-black block">Niveau</span>
                                            <span className="text-xl font-pirate text-[#3e2723]">{count}</span>
                                        </div>
                                        <div className="bg-[#3e2723]/10 p-2 rounded-lg border border-[#3e2723]/20">
                                            <span className="text-[10px] text-[#3e2723]/60 uppercase font-black block">Effet Actif</span>
                                            <span className="text-sm font-pirate text-[#b45309] leading-tight flex items-center justify-center h-7">
                                                {item.skillConfig?.type === 'buff_click' ? 'Boost Clic' : 'Boost Revenus'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {cost >= 0 && (
                                    <button
                                        onClick={handleBuy}
                                        disabled={!canAfford}
                                        className={`w-full py-3 rounded-xl font-pirate text-xl flex items-center justify-center gap-1 transition-all ${canAfford ? 'bg-[#3e2723] text-[#f3e5ab] hover:scale-[1.02] shadow-lg' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                                    >
                                        Améliorer ({formatNumber(cost)} <Coins className="w-4 h-4" />)
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
            onClick={() => buyItem(item)}
            className={`relative bg-[#f3e5ab] border-2 p-2 rounded shadow-sm transition-all select-none cursor-pointer flex justify-between items-start ${canAfford ? 'border-[#3e2723]/20 hover:shadow-md hover:bg-white active:scale-[0.98]' : 'border-gray-400/20 opacity-60 grayscale cursor-not-allowed'}`}
        >
            <div className="flex gap-3">
                <div className="w-12 h-12 bg-[#8b7e66]/20 border border-[#3e2723]/10 flex items-center justify-center rounded text-[#3e2723]">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-pirate text-lg leading-none text-[#3e2723]">{item.name}</h4>
                    <div className="text-[10px] uppercase font-bold text-[#3e2723]/50 mt-1">{item.desc}</div>
                    <div className="text-xs font-bold text-[#b45309] mt-1">+{formatNumber(item.basePower)} {type === 'click' ? 'clic' : '/sec'}</div>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-[#3e2723]/40">NIV. {count}</span>
                <button className={`mt-2 px-3 py-1 text-xs font-bold rounded shadow flex items-center gap-1 transition-colors ${canAfford ? 'bg-[#3e2723] text-[#f3e5ab]' : 'bg-gray-400 text-gray-200'}`}>
                    {formatNumber(cost)} <Coins className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};

export default ShopItem;