'use client';
import React from 'react';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';
import { SkinItem, BackgroundItem } from '@/types';

interface ItemCosmetiqueProps {
    item: SkinItem | BackgroundItem;
    type: 'skin' | 'bg';
}

const ItemCosmetique: React.FC<ItemCosmetiqueProps> = ({ item, type }) => {
    const { unlockedCosmetics, equipped, gold, ancientCoins, buyOrEquipCosmetic } = useGame();
    const isUnlocked = unlockedCosmetics.includes(`${type}_${item.id}`);

    const isEquipped = equipped[type] === item.id;
    const currency = (item as any).currency || 'gold';
    const canAfford = currency === 'pa' ? ancientCoins >= item.cost : gold >= item.cost;

    const renderPreview = () => {
        if (type === 'skin') {
            const skinItem = item as SkinItem;
            if (skinItem.image) {
                return (
                    <Image src={skinItem.image} alt={skinItem.name} width={200} height={200} className="w-32 h-32 md:w-48 md:h-48 object-contain" />
                );
            }
            return (
                <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br ${skinItem.colors} border-2 ${skinItem.border} flex items-center justify-center`}>
                    {skinItem.icon && <skinItem.icon className="w-16 h-16 text-black/50" />}
                </div>
            );
        } else {
            const bgItem = item as BackgroundItem;
            if (bgItem.image) {
                return (
                    <Image src={bgItem.image} alt={bgItem.name} width={320} height={180} className="w-full aspect-video rounded-xl object-cover border-2 border-gray-400 shadow-sm" />
                );
            }

            const bgClasses = bgItem.css ? bgItem.css.split(' ').filter(c => c.startsWith('from') || c.startsWith('via') || c.startsWith('to') || c.startsWith('bg-')).join(' ') : 'bg-gray-800';
            return (
                <div className={`w-full aspect-video rounded-xl bg-gradient-to-b ${bgClasses} border-2 border-gray-400`}></div>
            );
        }
    };

    return (
        <div
            onClick={() => buyOrEquipCosmetic(type, item)}
            className={`relative p-4 transition-all select-none cursor-pointer flex flex-col items-center text-center gap-3 group transform active:scale-95 ${isEquipped ? 'scale-105 brightness-110' : (isUnlocked || canAfford) ? '' : 'opacity-50 grayscale'}`}
        >
            <div className="relative">
                {renderPreview()}
                {isEquipped && (
                    <div className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                )}
            </div>

            <div className="flex-grow flex flex-col items-center justify-center">
                <h4 className="font-pirate text-base md:text-3xl leading-none text-white">{item.name}</h4>
                {isEquipped && (
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mt-1 shadow-black">ÉQUIPÉ</span>
                )}
            </div>

            {!isEquipped && (
                <button
                    disabled={!isUnlocked && !canAfford && item.cost > 0}
                    className={`w-full max-w-[150px] py-1.5 rounded-xl font-pirate text-lg tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md mt-1 border-none outline-none
                        ${isUnlocked ? 'bg-[#FAFAFA] text-black active:scale-105' :
                            (item.priceLabel ? 'bg-purple-600 text-white border border-purple-400' :
                                (canAfford ? 'bg-[#FAFAFA] text-black active:scale-105' : 'bg-gray-700 text-gray-400 cursor-not-allowed'))}`}
                >
                    {isUnlocked ? 'ÉQUIPER' : (item.priceLabel ? item.priceLabel : <><span className="font-times">{Math.floor(item.cost).toLocaleString('fr-FR')}</span> <Image src={currency === 'pa' ? "/pieceAntique.png" : "/iconduHeader.png"} alt="Devise" width={14} height={14} className="w-3.5 h-3.5 object-contain" /></>)}
                </button>
            )}
        </div>
    );
};

export default ItemCosmetique;
