'use client';
import React from 'react';
import { Coins } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { SkinItem, BackgroundItem } from '@/types';
import { formatNumber } from '@/data/config';

interface CosmeticItemProps {
    item: SkinItem | BackgroundItem;
    type: 'skin' | 'bg';
}

const CosmeticItem: React.FC<CosmeticItemProps> = ({ item, type }) => {
    const { unlockedCosmetics, equipped, gold, buyOrEquipCosmetic } = useGame();
    const isUnlocked = unlockedCosmetics.includes(`${type}_${item.id}`);

    // On force le typage ici pour accéder aux propriétés spécifiques en toute sécurité
    const isEquipped = equipped[type] === item.id;
    const canAfford = gold >= item.cost;

    const renderPreview = () => {
        if (type === 'skin') {
            const skinItem = item as SkinItem;
            if (skinItem.image) {
                return (
                    <img src={skinItem.image} alt={skinItem.name} className="w-10 h-10 object-contain drop-shadow-md" />
                );
            }
            return (
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${skinItem.colors} border-2 ${skinItem.border} flex items-center justify-center`}>
                    <skinItem.icon className="w-5 h-5 text-black/50" />
                </div>
            );
        } else {
            const bgItem = item as BackgroundItem;
            const bgClasses = bgItem.css.split(' ').filter(c => c.startsWith('from') || c.startsWith('via') || c.startsWith('to') || c.startsWith('bg-')).join(' ');
            return (
                <div className={`w-10 h-10 rounded bg-gradient-to-b ${bgClasses} border border-gray-400`}></div>
            );
        }
    };

    return (
        <div
            onClick={() => buyOrEquipCosmetic(type, item)}
            className={`relative bg-[#f3e5ab] border-2 p-2 rounded shadow-sm transition-all select-none cursor-pointer flex flex-col items-center text-center gap-2 ${isEquipped ? 'border-green-600 bg-green-50' : (isUnlocked || canAfford) ? 'border-[#3e2723]/20 hover:shadow-md' : 'border-gray-400/20 opacity-70'}`}
        >
            {renderPreview()}
            <div className="flex-grow">
                <h4 className="font-pirate text-lg leading-none text-[#3e2723]">{item.name}</h4>
                {isEquipped && <div className="text-[10px] font-bold text-green-700 uppercase mt-1">Équipé</div>}
            </div>
            {!isEquipped && (
                <button className={`w-full px-2 py-1 text-[10px] font-bold rounded shadow flex items-center justify-center gap-1 ${isUnlocked ? 'bg-[#3e2723] text-[#f3e5ab]' : (canAfford ? 'bg-[#ca8a04] text-black' : 'bg-gray-400 text-gray-200')}`}>
                    {isUnlocked ? 'ÉQUIPER' : <>{formatNumber(item.cost)} <Coins className="w-3 h-3" /></>}
                </button>
            )}
        </div>
    );
};

export default CosmeticItem;