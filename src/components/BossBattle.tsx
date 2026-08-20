import React, { useState, useEffect, useRef } from 'react';
import { TopicDegree, Question } from '../types';
import { Timer, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, Trophy, ArrowRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BossBattleProps {
  bossDegree: TopicDegree;
  topicTitle: string;
  onVictory: (earnedXp: number) => void;
  onDefeat: () => void;
  triggerHaptic: (type: 'success' | 'error' | 'warning' | 'light' | 'medium' | 'heavy') => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({
  bossDegree,
  topicTitle,
  onVictory,
  onDefeat,
  triggerHaptic
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(bossDegree.questions[0]?.time_limit_seconds || 75);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<'victory' | 'defeat' | null>(null);
  const isFinishedRef = useRef(isFinished);
  isFinishedRef.current = isFinished;

  const activeQuestion: Question = bossDegree.questions[currentIdx] || bossDegree.questions[0];

  // Countdown timer with clean single interval
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isFinishedRef.current) {
            setIsFinished('defeat');
            triggerHaptic('error');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, triggerHaptic]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || isFinished) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const selectedOption = activeQuestion.options.find(o => o.id === optionId);
    if (selectedOption?.is_correct) {
      triggerHaptic('success');
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      triggerHaptic('error');
    }
  };

  const handleNext = () => {
    const isLastQuestion = currentIdx + 1 >= bossDegree.questions.length;

    if (!isLastQuestion) {
      setSelectedOptionId(null);
      setIsAnswered(false);
      setCurrentIdx(prev => prev + 1);
    } else {
      // Check final score
      const totalCorrect = correctAnswersCount;
      const requiredCorrect = bossDegree.required_correct || bossDegree.questions.length;

      if (totalCorrect >= requiredCorrect) {
        setIsFinished('victory');
        triggerHaptic('heavy');
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 }
        });
      } else {
        setIsFinished('defeat');
        triggerHaptic('error');
      }
    }
  };

  if (isFinished === 'victory') {
    return (
      <div className="max-w-md mx-auto p-5 text-center space-y-6 pt-10 animate-fade-in">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-yellow-400 flex items-center justify-center text-5xl shadow-2xl glow-rose animate-bounce">
          👑
        </div>

        <div>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-300 mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            БОСС УНИЧТОЖЕН!
          </div>
          <h2 className="text-2xl font-black text-white font-heading">
            {bossDegree.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Тема «{topicTitle}» полностью пройдена!
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 text-left space-y-2 glow-gold">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Награды за подвиг:
          </div>
          <ul className="text-xs text-slate-300 space-y-1 pl-1">
            <li>✨ <strong>+200 XP</strong> к твоему рейтингу</li>
            <li>📜 Разблокирован <strong>Секретный мини-урок</strong></li>
            <li>🏆 Получен бейдж <strong>«Победитель Боссов»</strong></li>
          </ul>
        </div>

        <button
          onClick={() => onVictory(200)}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Забрать награды и открыть секрет</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (isFinished === 'defeat') {
    return (
      <div className="max-w-md mx-auto p-5 text-center space-y-6 pt-12 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl shadow-xl">
          💥
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
            Реактор перегружен
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1 font-heading">
            Босс оказался быстрее!
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Правильных ответов: {correctAnswersCount} из {bossDegree.questions.length}. Попробуй снова!
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <button
            onClick={() => {
              setTimeLeft(bossDegree.questions[0]?.time_limit_seconds || 75);
              setCurrentIdx(0);
              setSelectedOptionId(null);
              setIsAnswered(false);
              setCorrectAnswersCount(0);
              setIsFinished(null);
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold text-xs shadow-lg transition active:scale-95"
          >
            Попробовать снова
          </button>
          <button
            onClick={onDefeat}
            className="w-full py-3 px-6 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 pb-20">
      {/* Boss Header with Pulsing Alert */}
      <div className="glass-panel rounded-3xl border border-rose-500/40 p-4 bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 glow-rose">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                РЕЖИМ БОССА
              </div>
              <div className="text-xs font-bold text-white">
                Вопрос {currentIdx + 1} из {bossDegree.questions.length} (Верно: {correctAnswersCount})
              </div>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border font-mono font-bold text-sm ${
            timeLeft < 25 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' 
              : 'bg-slate-800 border-slate-700 text-amber-300'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel rounded-3xl border border-slate-700/80 p-5 shadow-xl space-y-4">
        {activeQuestion.story_context && (
          <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-semibold">{activeQuestion.story_context}</span>
          </div>
        )}

        <h3 className="text-base font-extrabold text-slate-100 leading-snug">
          {activeQuestion.question_text}
        </h3>

        <div className="space-y-2.5 pt-1">
          {activeQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let btnStyle = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/70 text-slate-200';

            if (isAnswered) {
              if (option.is_correct) {
                btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-200 glow-emerald';
              } else if (isSelected && !option.is_correct) {
                btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-200 glow-rose';
              } else {
                btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={option.id}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-3 active:scale-[0.98] ${btnStyle}`}
              >
                <span>{option.text}</span>
                {isAnswered && option.is_correct && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !option.is_correct && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/80 space-y-3 animate-fade-in">
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {activeQuestion.explanation}
          </p>

          <button
            onClick={handleNext}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Следующая фаза</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
