'use client';
import React from 'react';
import { useGame } from '@/context/GameContext';
import { QUESTS } from '@/data/quests';
import { Pin } from 'lucide-react';

const WidgetQuetes: React.FC = () => {
    const { trackedQuests, completedQuests, totalGold, inventory, unlockedCosmetics, view } = useGame();


    const activeTracked = QUESTS.filter(q =>
        trackedQuests.includes(q.id) && !completedQuests.includes(q.id)
    ).slice(0, 2);

    if (activeTracked.length === 0 || view === 'shop') return null;

    return (
        <div onPointerDown={(e) => e.stopPropagation()} className="absolute top-[110px] left-6 md:left-auto md:right-10 z-40 flex flex-col gap-4 max-w-[200px] md:max-w-[280px] md:items-end">
            {activeTracked.map(quest => {
                const isFinished = quest.condition({ totalGold, inventory, unlockedCosmetics });

                return (
                    <div
                        key={quest.id}
                        className={`group relative flex flex-col items-start md:items-end transition-all duration-500 ${isFinished ? 'animate-pulse' : ''}`}
                    >
                        <div className="flex flex-col min-w-0 pr-1 md:items-end md:text-right">
                            <span className={`text-base md:text-2xl font-pirate tracking-widest leading-none ${isFinished ? 'text-green-300' : 'text-white'}`}>
                                {quest.title}
                            </span>
                            {isFinished ? (
                                <span className="text-[10px] md:text-sm font-black text-green-400 uppercase tracking-widest mt-1">
                                    ✓ À RÉCLAMER !
                                </span>
                            ) : (
                                <span className="text-[11px] md:text-[14px] text-white/60 truncate mt-0.5 italic tracking-wide font-medium">
                                    {quest.description}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WidgetQuetes;

