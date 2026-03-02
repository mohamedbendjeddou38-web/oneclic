'use client';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { auth, googleProvider, signInWithPopup } from '@/lib/firebase';
interface ModalAuthProps {
    onLoginSuccess: (token: string, uid: string) => void;
}
export const ModalAuth: React.FC<ModalAuthProps> = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getFriendlyErrorMessage = (err: string) => {
        if (!err) return '';
        const lowerErr = err.toLowerCase();

        if (lowerErr.includes('invalid_login_credentials') ||
            lowerErr.includes('auth/invalid-credential') ||
            lowerErr.includes('auth/wrong-password') ||
            lowerErr.includes('auth/user-not-found')) {
            return "Email ou mot de passe incorrect. Vérifie tes informations, moussaillon !";
        }

        if (lowerErr.includes('auth/invalid-email') || lowerErr.includes('email invalide')) {
            return "L'adresse email n'est pas valide. Es-tu sûr de ton écriture ?";
        }

        if (lowerErr.includes('auth/email-already-in-use') || lowerErr.includes('existe déjà')) {
            return "Cet email est déjà utilisé par un autre pirate !";
        }

        if (lowerErr.includes('auth/weak-password')) {
            return "Ton mot de passe est trop fragile ! Il doit faire au moins 6 caractères.";
        }

        if (lowerErr.includes('too-many-attempts')) {
            return "Trop de tentatives ! Reprends ton souffle et réessaie un peu plus tard.";
        }

        if (lowerErr.includes('popup-closed-by-user')) {
            return "Tu as fermé la fenêtre de connexion Google avant la fin !";
        }

        if (lowerErr.includes('compte créé')) {
            return err;
        }

        return "Une erreur est survenue lors de l'abordage. Réessaie plus tard !";
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        setError('');
        const action = isLogin ? 'login' : 'register';
        try {
            const res = await fetch('https://api-mohamed.inkart.fr/api/auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                if (action === 'register' && data.error && data.error.includes('existe déjà')) {
                    setError(data.error);
                } else {
                    throw new Error(data.error || 'Erreur inconnue');
                }
            } else {
                if (action === 'register') {

                    const loginRes = await fetch('https://api-mohamed.inkart.fr/api/auth.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'login', email, password })
                    });
                    const loginData = await loginRes.json();
                    if (loginRes.ok && loginData.token) {
                        onLoginSuccess(loginData.token, loginData.uid);
                    } else {
                        setIsLogin(true);
                        setError('Compte créé ! Connectez-vous pour commencer.');
                    }
                } else if (action === 'login' && data.token) {
                    onLoginSuccess(data.token, data.uid);
                }
            }
        } catch (err: any) {
            console.error('Erreur API:', err);
            setError(err.message || 'Erreur de connexion au serveur.');
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();
            const uid = result.user.uid;
            onLoginSuccess(token, uid);
        } catch (err: any) {
            console.error("Erreur Google Auth: ", err);
            setError(err.message || "Erreur lors de la connexion avec Google");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-[100] min-h-screen w-full bg-[#000000] flex items-center justify-center p-4 overflow-hidden">

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Permanent+Marker&family=Roboto:wght@400;900&display=swap');

                .font-bangers { font-family: 'Bangers', cursive; }
                .font-marker { font-family: 'Permanent Marker', cursive; }

                .manga-grain {
                    background-image: url("https://www.transparenttextures.com/patterns/asfalt-dark.png");
                }
            `}} />

            <div className="relative z-10 w-full max-w-[450px] bg-[#0a0a0a] border-1 border-white p-8 md:p-12 transform">

                <div className="text-center mb-10">

                    <p className="text-[#444] text-[10px] uppercase tracking-[0.5em] mt-4 font-black">
                        Seras-tu le roi des pirates ?
                    </p>
                </div>
                {error && (
                    <div className={`p-3 border-2 mb-6 font-marker text-sm text-center ${error.includes('créé') ? 'bg-[#1b5e20]/20 border-[#81c784] text-[#81c784]' : 'bg-[#b71c1c]/20 border-[#e57373] text-[#e57373]'}`}>
                        {getFriendlyErrorMessage(error)}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-marker text-[#888] text-sm uppercase tracking-wider block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nom@equipage.com"
                            className="w-full bg-[#111] border-2 border-[#333] p-4 text-white outline-none focus:border-white focus:bg-[#1a1a1a] transition-all duration-300 shadow-inner"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-marker text-[#888] text-sm uppercase tracking-wider block">
                            Mot de Passe
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#111] border-2 border-[#333] p-4 text-white outline-none focus:border-white focus:bg-[#1a1a1a] transition-all duration-300 shadow-inner"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bangers text-3xl py-4 uppercase tracking-wider hover:bg-[#ccc] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
                        {isLogin ? "Lever l'ancre" : "S'enrôler"}
                    </button>
                </form>

                <div className="relative my-10 border-t border-[#333]">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-4 font-marker text-[#444] text-xs">
                        OU
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full border border-[#333] text-white py-3 flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-current" /> : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    )}
                    Se connecter avec Google
                </button>

                <div className="mt-10 text-center">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="text-xs font-bold text-white hover:text-gray-400 uppercase tracking-widest underline underline-offset-8 decoration-1 transition-colors"
                    >
                        {isLogin ? "Créer un nouvel équipage" : "J'ai déjà un équipage"}
                    </button>
                </div>
            </div>
        </div>
    );
};

