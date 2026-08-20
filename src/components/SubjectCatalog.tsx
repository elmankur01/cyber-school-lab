import React, { useState } from 'react';
import { Topic, UserProfile } from '../types';
import { SUBJECTS, COMPANION_DRONES } from '../data/mockData';
import { BookOpen, CheckCircle2, Sparkles, ChevronRight, Gift, Cpu } from 'lucide-react';

interface SubjectCatalogProps {
  profile: UserProfile;
  onSelectTopic: (topic: Topic) => void;
  onOpenSecret: (topic: Topic) => void;
  onSelectGrade: (grade: number) => void;
}

export const SubjectCatalog: React.FC<SubjectCatalogProps> = ({
  profile,
  onSelectTopic,
  onOpenSecret,
  onSelectGrade
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(SUBJECTS[0].id);

  const activeSubject = SUBJECTS.find(s => s.id === selectedSubjectId) || SUBJECTS[0];
  const currentDrone = COMPANION_DRONES.find(d => d.id === profile.drone_id) || COMPANION_DRONES[0];

  const grades = Array.from({ length: 11 }, (_, i) => i + 1);

  // Filter topics for selected grade, or show all if none match exactly
  const matchingTopics = activeSubject.topics.filter(t => t.grade_level === profile.selected_grade);
  const displayTopics = matchingTopics.length > 0 ? matchingTopics : activeSubject.topics;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
      {/* Grade Selector Strip */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Выбери свой класс:
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            Активен: <strong className="text-cyan-300">{profile.selected_grade}-й класс</strong>
          </span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar py-0.5">
          {grades.map((grade) => {
            const isSelected = grade === profile.selected_grade;
            return (
              <button
                key={grade}
                onClick={() => onSelectGrade(grade)}
                className={`min-w-[36px] h-9 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center justify-center ${
                  isSelected
                    ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/30 scale-105 border border-cyan-300'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {grade}
              </button>
            );
          })}
        </div>
      </div>

      {/* Companion Drone Tip Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-cyan-500/30 flex items-center justify-center text-2xl shrink-0">
          {currentDrone.emoji}
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
            <span>{currentDrone.name}</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">Дрон-Спутник</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-tight mt-0.5">
            {currentDrone.bonus_text}
          </p>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SUBJECTS.map((subject) => {
          const isActive = subject.id === selectedSubjectId;
          return (
            <button
              key={subject.id}
              onClick={() => setSelectedSubjectId(subject.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span className="text-base">{subject.icon}</span>
              <span>{subject.short_title}</span>
            </button>
          );
        })}
      </div>

      {/* Subject Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-cyan-500/20 p-4 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-[10px] font-extrabold text-cyan-300 mb-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Кибер-Протоколы ({profile.selected_grade} класс)
            </div>
            <h2 className="text-base font-black text-white font-heading">
              {activeSubject.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-[260px] leading-relaxed">
              {activeSubject.description}
            </p>
          </div>
          <span className="text-4xl filter drop-shadow-md">{activeSubject.icon}</span>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Доступные модули & Вирусы
          </h3>
          <span className="text-[10px] font-bold text-slate-400">
            {displayTopics.length} модуля
          </span>
        </div>

        {displayTopics.map((topic) => {
          const isBossDefeated = profile.defeated_bosses.includes(topic.id);
          const isSecretUnlocked = profile.unlocked_secrets.includes(topic.id);

          return (
            <div
              key={topic.id}
              className="glass-panel rounded-3xl border border-slate-800 p-4 hover:border-cyan-500/40 transition-all shadow-md group relative overflow-hidden bg-slate-900/90"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                      {topic.grade_level} класс
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                      🛰️ {topic.story_setting}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {topic.description}
                  </p>
                </div>

                {isBossDefeated ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Degrees Pills */}
              <div className="flex items-center gap-1.5 py-2">
                {topic.degrees.map((deg) => {
                  const isBoss = deg.isBoss;
                  return (
                    <div
                      key={deg.level}
                      className={`flex-1 py-1 px-1.5 rounded-xl text-center text-[10px] font-black border transition ${
                        isBoss
                          ? isBossDefeated
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                          : 'bg-slate-800/80 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      {isBoss ? '👾 Вирус' : `Степень ${deg.level}`}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {isSecretUnlocked && (
                  <button
                    onClick={() => onOpenSecret(topic)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition active:scale-95"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Секретный чип</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectTopic(topic)}
                  className="flex-1 ml-auto flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 text-white text-xs font-black shadow-md shadow-cyan-600/20 transition active:scale-95"
                >
                  <span>{isBossDefeated ? 'Перезапустить модуль' : 'Запустить протокол'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
