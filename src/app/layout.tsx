import type { Metadata } from 'next';
import { GameProvider } from '@/context/GameContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'ClickCoins - Ultimate Pirate',
  description: 'Pille, améliore et deviens le roi des pirates dans ce jeu clicker épique.',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fr">
      <body className="bg-black text-white antialiased overflow-hidden select-none">
      <GameProvider>
        {children}
      </GameProvider>
      </body>
      </html>
  );
}