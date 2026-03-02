'use client';
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { X, Trophy, Anchor, Settings } from 'lucide-react';
import { LeaderboardData } from '@/types';
import Image from 'next/image';
import ModalCompte from './ModalCompte';

interface VoletClassementProps {
    isOpen: boolean;
    onClose: () => void;
}

const VoletClassement: React.FC<VoletClassementProps> = ({ isOpen, onClose }) => {
    const { fetchLeaderboard, token, syncCountdown, lastSyncTime } = useGame();
    const [data, setData] = useState<LeaderboardData | null>(null);
    const [loading, setLoading] = useState(false);
    const [isCompteOpen, setIsCompteOpen] = useState(false);

    const refresh = React.useCallback(() => {
        if (!isOpen) return;
        setLoading(true);
        fetchLeaderboard().then(res => {
            setData(res);
            setLoading(false);
        });
    }, [isOpen, fetchLeaderboard]);


    useEffect(() => {
        if (isOpen) {
            refresh();
        }
    }, [lastSyncTime, isOpen, refresh]);

    const maskName = (name: string) => {
        if (!name) return 'Pirate';
        if (name.length <= 2) return name;
        return name.substring(0, 2).toUpperCase() + '***';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex justify-end pointer-events-none">
            {}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {}
            <div className={`relative w-full max-w-[360px] h-full bg-[#0a0a0a] border-l-2 border-white/20 pointer-events-auto shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col animate-in slide-in-from-right duration-300`}>

                {}
                <div className="p-6 pt-10 border-b border-white/10 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="font-pirate text-5xl text-white">LEGENDE</h2>
                        <p className="text-[#444] text-[10px] uppercase tracking-[0.3em] font-black mt-1">Les plus grands pillards</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
                        <X size={28} />
                    </button>
                </div>

                {}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading && !data ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <Anchor className="w-12 h-12 text-white/20 animate-spin" />
                            <p className="font-marker text-white/30 tracking-widest uppercase">Calcul du butin...</p>
                        </div>
                    ) : (
                        <div className="space-y-3 pb-4">
                            {data?.leaderboard.map((player, index) => {
                                const rank = index + 1;
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-1 transition-all transform hover:scale-[1.02] ${rank <= 3 ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5'}`}
                                    >
                                        <div className={`w-10 h-10 flex items-center justify-center font-pirate text-3xl shrink-0
                                            ${rank === 1 ? 'text-yellow-500 scale-125' :
                                                rank === 2 ? 'text-gray-300' :
                                                    rank === 3 ? 'text-orange-400' : 'text-white/20'}`}>
                                            {rank === 1 ? <Trophy size={24} /> : <span className="font-times">{rank}</span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-marker text-white uppercase tracking-tighter text-xl leading-none truncate">{maskName(player.name)}</p>
                                            <div className="flex items-center gap-1.5 mt-1.5 opacity-80">
                                                <Image src="/iconduHeader.png" alt="Coins" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                                                <span className="text-xs font-black text-white tracking-wider font-times">{Math.floor(player.totalGold).toLocaleString('fr-FR')}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {}
                <div className="p-6 pb-10 bg-[#0a0a0a] border-t border-white/10 shadow-[0_-15px_30px_rgba(0,0,0,0.6)] relative z-10 shrink-0">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <p className="text-[#555] text-[9px] uppercase tracking-[0.2em] font-black text-center">Votre Prestige Actuel</p>
                        <button
                            onClick={() => setIsCompteOpen(true)}
                            className="text-[#555] hover:text-white transition-colors"
                        >
                            <Settings size={14} className="hover:animate-spin" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border-2 border-white/10 transform rotate-[0.5deg] gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border-2 border-[#f3e5ab]/20 shadow-inner shrink-0">
                                <span className="font-times text-2xl text-white">{data?.userRank || '?'}</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-marker text-white text-xl leading-none tracking-tighter truncate">PIRATE</p>
                                <p className="text-[9px] text-[#555] mt-1.5 uppercase font-black tracking-[.2em]">{data?.userRank ? (data.userRank <= 10 ? 'ROI DES PIRATES' : data.userRank <= 50 ? 'CAPITAINE' : 'MATELOT') : 'ANONYME'}</p>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="font-times text-white text-xl leading-none">{Math.floor(data?.userStats?.totalGold || 0).toLocaleString('fr-FR')}</p>
                            <p className="text-[8px] text-[#555] uppercase font-black mt-1">PIÈCES TOTALES</p>
                        </div>
                    </div>
                </div>
            </div>

            <ModalCompte isOpen={isCompteOpen} onClose={() => setIsCompteOpen(false)} userRank={data?.userRank} />
        </div>
    );
};

export default VoletClassement;

