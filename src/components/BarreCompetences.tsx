import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';
import { CONFIG } from '@/data/config';
const BarreCompetences: React.FC = () => {
    const { inventory, activeSkills, skillCooldowns, activateSkill, view } = useGame();
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const skills = CONFIG.clickUpgrades.filter(item => item.skillConfig && (inventory[item.id] || 0) > 0);

    if (skills.length === 0 || view === 'shop') return null;

    const formatTime = (ms: number) => {
        const s = Math.ceil(ms / 1000);
        if (s > 60) return `${Math.ceil(s / 60)}m`;
        return `${s}s`;
    };

    const isAnySkillActive = Object.values(activeSkills).some(expiry => expiry > now);

    return (
        <div className="fixed bottom-32 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-6 lg:right-auto flex lg:flex-col justify-around px-8 lg:px-0 lg:h-[60vh] gap-2 z-[60] pointer-events-none lg:pointer-events-auto lg:p-0 lg:items-center">
            {skills.map(skill => {
                const isActive = (activeSkills[skill.id] || 0) > now;
                const cooldownEnd = skillCooldowns[skill.id] || 0;
                const isCooldown = cooldownEnd > now;
                const isDisabled = isCooldown || isAnySkillActive;

                return (
                    <button
                        key={skill.id}
                        onClick={() => activateSkill(skill.id)}
                        disabled={isDisabled}
                        className={`
                            pointer-events-auto
                            relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all flex items-center justify-center
                            ${isActive
                                ? 'scale-110'
                                : isDisabled
                                    ? 'grayscale opacity-70 cursor-not-allowed'
                                    : 'hover:scale-110 active:scale-95 hover:brightness-110'
                            }
                        `}
                    >
                        {skill.activeIcon ? (
                            <Image src={skill.activeIcon} alt={skill.name} fill sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px" className="object-contain" />
                        ) : (
                            <span className="text-[10px] font-bold text-white text-center leading-none p-1">{skill.name}</span>
                        )}


                        {isCooldown && (
                            <div
                                className="absolute inset-x-0 bottom-0 transition-all z-10"
                                style={{ height: `${Math.min(100, ((cooldownEnd - now) / (skill.skillConfig!.cooldown * 1000)) * 100)}%` }}
                            ></div>
                        )}


                        {isActive && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="font-times text-lg text-white">{formatTime(activeSkills[skill.id] - now)}</span>
                            </div>
                        )}
                        {isCooldown && !isActive && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="font-times text-xs text-white">{formatTime(cooldownEnd - now)}</span>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default BarreCompetences;

