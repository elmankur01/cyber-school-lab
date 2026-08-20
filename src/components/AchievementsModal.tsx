import React from 'react';
import { Achievement } from '../types';
import { X, CheckCircle2, Lock } from 'lucide-react';

interface AchievementsModalProps {
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-700/80 p-6 bg-slate-900 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between pr-8">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
              Зал Славы
            </div>
            <h3 className="text-base font-extrabold text-white font-heading">
              Твои Достижения
            </h3>
          </div>
          <div className="px-3 py-1 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-xs font-bold text-indigo-300">
            {unlockedCount} / {achievements.length}
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          {achievements.map((ach) => {
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border flex items-center gap-3.5 transition ${
                  ach.unlocked
                    ? 'bg-indigo-950/40 border-indigo-500/40 glow-indigo'
                    : 'bg-slate-800/50 border-slate-700/60 opacity-60'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                  {ach.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-100">
                      {ach.title}
                    </h4>
                    {ach.unlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Lock className="w-3 h-3 text-slate-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {ach.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-amber-400">
                    +{ach.reward_xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
