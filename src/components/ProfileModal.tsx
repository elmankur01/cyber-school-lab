import React from 'react';
import { UserProfile } from '../types';
import { AVATARS, ANONYMOUS_NICKNAMES, COMPANION_DRONES } from '../data/mockData';
import { X, RefreshCw, Shield, Trash2, Check, Cpu } from 'lucide-react';

interface ProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onUpdateProfile,
  onResetProgress
}) => {
  if (!isOpen) return null;

  const grades = Array.from({ length: 9 }, (_, i) => i + 3); // 3-й — 11-й классы

  const handleRandomNickname = () => {
    const randomNick = ANONYMOUS_NICKNAMES[Math.floor(Math.random() * ANONYMOUS_NICKNAMES.length)];
    const randomSuffix = Math.floor(Math.random() * 90) + 10;
    onUpdateProfile({ nickname: `${randomNick}_${randomSuffix}` });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-cyan-500/30 p-6 bg-slate-950 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-black text-white font-heading flex items-center gap-2">
          <span>⚙️</span> Кибер-Профиль Оператора
        </h3>

        {/* Grade Selector */}
        <div className="space-y-1.5">
          <div className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Твой школьный класс:
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {grades.map((grade) => {
              const isSelected = profile.selected_grade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => onUpdateProfile({ selected_grade: grade })}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/40'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>

        {/* Companion Drone Selector */}
        <div className="space-y-2">
          <div className="text-xs font-black text-cyan-400 uppercase tracking-wider">
            Выбери Дрона-Спутника
          </div>
          <div className="grid grid-cols-2 gap-2">
            {COMPANION_DRONES.map((drone) => {
              const isSelected = profile.drone_id === drone.id;
              return (
                <button
                  key={drone.id}
                  onClick={() => onUpdateProfile({ drone_id: drone.id })}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 glow-indigo'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl shrink-0">{drone.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {drone.name}
                    </div>
                    <div className="text-[10px] text-cyan-300 mt-0.5">
                      {drone.specialty}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Avatar Selector */}
        <div className="space-y-2">
          <div className="text-xs font-black text-cyan-400 uppercase tracking-wider">
            Аватар Оператора
          </div>
          <div className="grid grid-cols-3 gap-2">
            {AVATARS.map((av) => {
              const isSelected = profile.avatar === av.id;
              return (
                <button
                  key={av.id}
                  onClick={() => onUpdateProfile({ avatar: av.id })}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-indigo-600/30 border-cyan-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[10px] font-semibold truncate max-w-full">{av.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Anonymous Nickname */}
        <div className="space-y-1.5">
          <div className="text-xs font-black text-cyan-400 uppercase tracking-wider">
            Игровой позывной (Анонимный)
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={profile.nickname}
              onChange={(e) => {
                const clean = e.target.value.replace(/[<>"'/\\{}]/g, '').slice(0, 20);
                onUpdateProfile({ nickname: clean });
              }}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
              maxLength={20}
            />
            <button
              onClick={handleRandomNickname}
              className="p-2.5 rounded-2xl bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-600/40 transition active:scale-95"
              title="Сгенерировать случайный позывной"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Zero PII & Legal Safety Badge */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
          <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            100% Анонимность & Безопасность (152-ФЗ)
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Мы не собираем реальные имена, телефоны, email или фото. Все данные деперсонализированы.
          </p>
        </div>

        {/* Reset Progress Button */}
        <button
          onClick={onResetProgress}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition active:scale-95"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Сбросить весь игровой прогресс</span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Сохранить настройки</span>
        </button>
      </div>
    </div>
  );
};
