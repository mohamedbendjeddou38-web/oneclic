import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { CONFIG } from '@/data/config';
import { Clock } from 'lucide-react';

const SkillBar: React.FC = () => {
    const { inventory, activeSkills, skillCooldowns, activateSkill } = useGame();
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const skills = CONFIG.clickUpgrades.filter(item => item.skillConfig && (inventory[item.id] || 0) > 0);

    if (skills.length === 0) return null;

    const formatTime = (ms: number) => {
        const s = Math.ceil(ms / 1000);
        if (s > 60) return `${Math.ceil(s / 60)}m`;
        return `${s}s`;
    };

    return (
        <div className="fixed bottom-40 left-0 right-0 flex justify-center gap-2 z-[60] pointer-events-none">
            {skills.map(skill => {
                const isActive = (activeSkills[skill.id] || 0) > now;
                const cooldownEnd = skillCooldowns[skill.id] || 0;
                const isCooldown = cooldownEnd > now;

                return (
                    <button
                        key={skill.id}
                        onClick={() => activateSkill(skill.id)}
                        disabled={isCooldown || isActive}
                        className={`
                            pointer-events-auto
                            relative w-20 h-20 rounded-full shadow-xl transition-all flex items-center justify-center overflow-hidden
                            ${isActive
                                ? 'border-[#f3e5ab] ring-4 ring-[#f3e5ab]/50 scale-110'
                                : isCooldown
                                    ? 'border-gray-600 grayscale opacity-80 cursor-not-allowed'
                                    : 'border-[#3e2723] hover:scale-110 active:scale-95'
                            }
                        `}
                    >
                        {skill.activeIcon ? (
                            <img src={skill.activeIcon} alt={skill.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-[10px] font-bold text-white text-center leading-none p-1">{skill.name}</span>
                        )}

                        {/* Cooldown Overlay */}
                        {isCooldown && (
                            <div
                                className="absolute inset-x-0 bottom-0 bg-black/70 transition-all z-10"
                                style={{ height: `${Math.min(100, ((cooldownEnd - now) / (skill.skillConfig!.cooldown * 1000)) * 100)}%` }}
                            ></div>
                        )}

                        {/* Timer Text */}
                        {isActive && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 backdrop-blur-[1px]">
                                <span className="font-pirate text-lg text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{formatTime(activeSkills[skill.id] - now)}</span>
                            </div>
                        )}
                        {isCooldown && !isActive && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="font-pirate text-xs text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{formatTime(cooldownEnd - now)}</span>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default SkillBar;
