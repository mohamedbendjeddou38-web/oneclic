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
    const count = inventory[item.id] || 0;
    const cost = getCost(item.baseCost, count);
    const canAfford = gold >= cost;
    const Icon = item.icon;

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