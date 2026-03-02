'use client';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, Lock, Gift, Pin, PinOff } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { QUESTS } from '@/data/quests';

interface ModalQuetesProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalQuetes: React.FC<ModalQuetesProps> = ({ isOpen, onClose }) => {
    const { totalGold, inventory, unlockedCosmetics, completedQuests, trackedQuests, toggleTrackQuest, claimQuest } = useGame();


    const questsStatus = useMemo(() => {
        return QUESTS.map(quest => {
            const isClaimed = completedQuests.includes(quest.id);
            const isCompleted = quest.condition({ totalGold, inventory, unlockedCosmetics });
            return {
                ...quest,
                isClaimed,
                isCompleted
            };
        });
    }, [totalGold, inventory, unlockedCosmetics, completedQuests]);

    if (!isOpen) return null;


    const claimable = questsStatus.filter(q => q.isCompleted && !q.isClaimed);
    const active = questsStatus.filter(q => !q.isCompleted);
    const claimed = questsStatus.filter(q => q.isClaimed);

    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 pointer-events-auto">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-[#0a0a0a] border-2 border-white/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors bg-black/50 rounded-full p-1 border border-white/10">
                    <X size={24} />
                </button>

                <div className="p-6 pb-4 border-b border-white/10 shrink-0 text-center">
                    <h2 className="font-pirate text-4xl text-white mb-1">Carnet de Quêtes</h2>
                    <p className="text-[#888] text-[10px] uppercase tracking-widest font-black">Accomplissez vos objectifs pour obtenir des Pièces Antiques</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">

                    {claimable.length > 0 && (
                        <div className="space-y-3 mb-6">
                            <h3 className="font-marker text-green-400 text-lg sticky top-[-24px] bg-[#0a0a0a] z-10 py-2 border-b border-green-900/50">Prêtes à être réclamées</h3>
                            {claimable.map(quest => (
                                <div key={quest.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-pirate text-sm md:text-xl text-white">{quest.title}</h4>
                                        <p className="text-white/80 text-[10px] md:text-xs">{quest.description}</p>
                                    </div>
                                    <button
                                        onClick={() => claimQuest(quest.id)}
                                        className="bg-green-500 text-black font-marker py-2 px-4 rounded hover:bg-green-400 transition-colors flex items-center gap-2 animate-pulse whitespace-nowrap"
                                    >
                                        <Gift size={16} />
                                        +<span className="font-times">{quest.rewardPA}</span> <Image src="/pieceAntique.png" alt="PA" width={16} height={16} className="object-contain" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {active.length > 0 && (
                        <div className="space-y-3 mb-6">
                            <h3 className="font-marker text-white text-lg sticky top-[-24px] bg-[#0a0a0a] z-10 py-2 border-b border-white/20">En Cours</h3>
                            {active.map(quest => (
                                <div key={quest.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                                    <div className="flex-1 flex items-center gap-3 overflow-hidden">
                                        <button
                                            onClick={() => toggleTrackQuest(quest.id)}
                                            className={`p-2 rounded-lg transition-all shrink-0 ${trackedQuests.includes(quest.id) ? 'bg-white text-black' : 'bg-white/5 text-white/30 hover:text-white/70'}`}
                                            title={trackedQuests.includes(quest.id) ? "Arrêter de suivre" : "Suivre cette quête"}
                                        >
                                            {trackedQuests.includes(quest.id) ? <PinOff size={16} /> : <Pin size={16} />}
                                        </button>
                                        <div className="min-w-0">
                                            <h4 className="text-sm md:text-xl text-white/90">{quest.title}</h4>
                                            <p className="text-white/50 text-[10px] md:text-xs leading-tight">{quest.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
                                        <Lock size={14} className="text-white/30" />
                                        <span className="font-marker text-white/80 pb-0.5 flex items-center gap-1">
                                            <span className="font-times">{quest.rewardPA}</span> <Image src="/pieceAntique.png" alt="PA" width={14} height={14} className="object-contain filter opacity-80" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {claimed.length > 0 && (
                        <div className="space-y-3 opacity-50">
                            <h3 className="font-marker text-white/50 text-lg sticky top-[-24px] bg-[#0a0a0a] z-10 py-2 border-b border-white/5">Terminées</h3>
                            {claimed.map(quest => (
                                <div key={quest.id} className="bg-black/50 border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-pirate text-xl text-white/40 line-through decoration-white/20">{quest.title}</h4>
                                        <p className="text-white/20 text-xs">{quest.description}</p>
                                    </div>
                                    <div className="shrink-0">
                                        <CheckCircle2 size={24} className="text-green-500/50" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ModalQuetes;

