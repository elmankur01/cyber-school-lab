import React from 'react';
import { DailyQuest } from '../types';
import { X, CheckCircle2, Gift, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: DailyQuest[];
  onClaimReward: (questId: string) => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({
  isOpen,
  onClose,
  quests,
  onClaimReward
}) => {
  if (!isOpen) return null;

  const completedCount = quests.filter((q) => q.completed).length;
  const allCompleted = completedCount === quests.length;

  const handleClaim = (q: DailyQuest) => {
    if (!q.completed || q.claimed) return;
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onClaimReward(q.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-amber-500/30 p-6 bg-slate-950 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
            🎯
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              Ежедневные Протоколы
            </div>
            <h3 className="text-base font-black text-white font-heading">
              Квесты Дня ({completedCount}/{quests.length})
            </h3>
          </div>
        </div>

        {/* Progress Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              <span>Обновление в 00:00 МСК</span>
            </span>
            <span className="text-slate-400 text-[11px]">
              {completedCount === quests.length ? '🎉 Все выполнены!' : `Осталось: ${quests.length - completedCount}`}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${(completedCount / quests.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Quest List */}
        <div className="space-y-3 pt-1">
          {quests.map((quest) => {
            const isDone = quest.progress >= quest.target;
            const progressPercent = Math.min(100, Math.round((quest.progress / quest.target) * 100));

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl border transition ${
                  quest.claimed
                    ? 'bg-slate-900/50 border-slate-800 opacity-60'
                    : isDone
                    ? 'bg-amber-950/30 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0 mt-0.5">
                      {quest.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{quest.title}</span>
                        {quest.claimed && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
                            Получено
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-[10px] font-black text-amber-400 flex items-center justify-end gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      +{quest.reward_xp} XP
                    </div>
                  </div>
                </div>

                {/* Progress bar & Claim button */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>Прогресс:</span>
                      <span>{quest.progress} / {quest.target}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {isDone && !quest.claimed ? (
                    <button
                      onClick={() => handleClaim(quest)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/30 transition active:scale-95 flex items-center gap-1"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Забрать</span>
                    </button>
                  ) : isDone && quest.claimed ? (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Готово</span>
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-slate-500 px-2 py-1">
                      В процессе
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allCompleted && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-center space-y-1">
            <div className="text-xs font-black text-amber-300">
              🔥 Стрик защищен и продлен!
            </div>
            <div className="text-[11px] text-slate-300">
              Вы выполнили все задания на сегодня. Возвращайтесь завтра за новой порцией XP!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
