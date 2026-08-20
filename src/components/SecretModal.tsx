import React from 'react';
import { Topic } from '../types';
import { X, Sparkles, BookOpen, Lightbulb, Check } from 'lucide-react';

interface SecretModalProps {
  topic: Topic | null;
  onClose: () => void;
}

export const SecretModal: React.FC<SecretModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-amber-500/40 p-6 bg-slate-900 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
            📜
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3 h-3" /> Секретный Материал
            </div>
            <h3 className="text-base font-extrabold text-white font-heading">
              {topic.secret_material.title}
            </h3>
          </div>
        </div>

        {/* Fact Card */}
        <div className="p-3.5 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 space-y-1">
          <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-indigo-400" />
            Интересный факт:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.secret_material.fact}
          </p>
        </div>

        {/* Mini Lesson Card */}
        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Секретный лайфхак & мини-урок:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.secret_material.mini_lesson}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Понятно, изучено!</span>
        </button>
      </div>
    </div>
  );
};
