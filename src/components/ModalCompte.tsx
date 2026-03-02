'use client';
import React, { useState, useEffect } from 'react';
import { X, Save, Edit2, Mail, Trophy, User } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';

interface ModalCompteProps {
    isOpen: boolean;
    onClose: () => void;
    userRank?: number | string | null;
}

const ModalCompte: React.FC<ModalCompteProps> = ({ isOpen, onClose, userRank }) => {
    const { fetchLeaderboard, forceSync, totalGold, userPseudo, userEmail } = useGame();
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [rank, setRank] = useState<number | string>('?');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
            setMessage('');
            return;
        }


        if (userPseudo) setPseudo(userPseudo);
        if (userEmail) setEmail(userEmail);

        if (userRank) {
            setRank(userRank);
        } else {
            fetchLeaderboard().then(res => {
                if (res && res.userRank) {
                    setRank(res.userRank);
                }
            });
        }
    }, [isOpen, fetchLeaderboard, userRank, userPseudo, userEmail]);

    const handleSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        setMessage('');
        try {
            await updateProfile(auth.currentUser, { displayName: pseudo });

            await auth.currentUser.getIdToken(true);
            await forceSync();
            setMessage('Profil mis à jour avec succès !');
            setIsEditing(false);
        } catch (e: any) {
            setMessage('Erreur: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 pointer-events-auto">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-[#0a0a0a] border-2 border-white/20 p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="text-center mb-6">
                    <h2 className="font-pirate text-3xl text-white mt-4">Mes informations</h2>
                </div>

                <div className="space-y-4">
                    {}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                            <Edit2 size={12} /> Pseudo
                        </label>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded p-2 text-white font-marker focus:outline-none focus:border-yellow-500 transition-colors"
                                    placeholder="Nouveau pseudo"
                                />
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400 disabled:opacity-50"
                                >
                                    <Save size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <span className="font-marker text-xl text-white">{pseudo || 'Pirate'}</span>
                                <button onClick={() => setIsEditing(true)} className="text-white/30 hover:text-yellow-500 transition-colors">
                                    <Edit2 size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                            <Mail size={12} /> Email
                        </label>
                        <div className="text-gray-300 font-mono text-sm truncate">{email}</div>
                    </div>

                    {}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <label className="text-[10px] text-yellow-500/70 uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                                <Trophy size={12} /> Classement
                            </label>
                            <div className="font-times text-2xl text-yellow-500">
                                {rank === '?' ? 'N/A' : <><span className="text-lg">#</span>{rank}</>}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Butin</div>
                            <div className="font-times text-lg text-white">{Math.floor(totalGold).toLocaleString('fr-FR')}</div>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className="mt-4 p-3 bg-white/5 border border-white/10 text-center text-sm font-marker text-green-400 rounded-xl">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalCompte;

