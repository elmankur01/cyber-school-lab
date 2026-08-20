import React, { useState } from 'react';
import { Topic, Question, TopicDegree, UserProfile } from '../types';
import { COMPANION_DRONES } from '../data/mockData';
import { Lightbulb, ArrowRight, CheckCircle2, XCircle, ArrowLeft, Sparkles, HelpCircle, ShieldCheck, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizPlayerProps {
  topic: Topic;
  profile: UserProfile;
  onBack: () => void;
  onDegreeComplete: (degreeLevel: number, earnedXp: number) => void;
  onStartBoss: (degree: TopicDegree) => void;
  triggerHaptic: (type: 'success' | 'error' | 'warning' | 'light' | 'medium' | 'heavy') => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  topic,
  profile,
  onBack,
  onDegreeComplete,
  onStartBoss,
  triggerHaptic
}) => {
  const regularDegrees = topic.degrees.filter(d => !d.isBoss);
  const bossDegree = topic.degrees.find(d => d.isBoss);
  const currentDrone = COMPANION_DRONES.find(d => d.id === profile.drone_id) || COMPANION_DRONES[0];

  const [currentDegreeIdx, setCurrentDegreeIdx] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [degreeXpPool, setDegreeXpPool] = useState<number>(0);
  const [degreeSuccess, setDegreeSuccess] = useState<boolean>(false);

  const activeDegree = regularDegrees[currentDegreeIdx] || regularDegrees[0];
  const activeQuestion: Question = activeDegree.questions[currentQuestionIdx] || activeDegree.questions[0];

  const isEnglishTopic = topic.subject_id === 'english_easy';

  // Cancel speech synthesis on unmount
  React.useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-to-Speech function for English phrases
  const speakText = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const cleanText = text.replace(/[^a-zA-Z0-9\s.,'?!]/g, '').trim();
      if (!cleanText) return;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // clear, comfortable speed for learners
      window.speechSynthesis.speak(utterance);
      triggerHaptic('light');
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const selectedOption = activeQuestion.options.find(o => o.id === optionId);
    if (selectedOption?.is_correct) {
      triggerHaptic('success');
      setDegreeXpPool(prev => prev + activeQuestion.base_xp);
      // Auto-pronounce if English
      if (isEnglishTopic) {
        speakText(selectedOption.text);
      }
    } else {
      triggerHaptic('error');
    }
  };

  const handleNextQuestion = () => {
    setShowHint(false);
    setSelectedOptionId(null);
    setIsAnswered(false);

    if (currentQuestionIdx + 1 < activeDegree.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Degree completed!
      setDegreeSuccess(true);
      triggerHaptic('heavy');
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.6 }
      });
      onDegreeComplete(activeDegree.level, degreeXpPool);
    }
  };

  const handleContinueToNextDegree = () => {
    setDegreeSuccess(false);
    if (currentDegreeIdx + 1 < regularDegrees.length) {
      setCurrentDegreeIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
      setDegreeXpPool(0);
    } else if (bossDegree) {
      onStartBoss(bossDegree);
    } else {
      onBack();
    }
  };

  if (degreeSuccess) {
    const isLastRegularDegree = currentDegreeIdx + 1 >= regularDegrees.length;
    return (
      <div className="max-w-md mx-auto p-5 text-center space-y-6 pt-10 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-xl shadow-cyan-500/20 animate-bounce-short">
          💾
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            Протокол {activeDegree.level} синхронизирован!
          </span>
          <h2 className="text-2xl font-black text-white mt-1 font-heading">
            {activeDegree.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Начислено: <span className="font-bold text-amber-300">+{degreeXpPool} Кибер-XP</span>
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 text-left space-y-2 bg-slate-900/90">
          <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Освоенный модуль:
          </div>
          <p className="text-xs text-slate-300">
            {activeDegree.subtitle}
          </p>
        </div>

        <div className="space-y-2.5 pt-4">
          <button
            onClick={handleContinueToNextDegree}
            className={`w-full py-3.5 px-6 rounded-2xl text-sm font-black text-white shadow-lg transition active:scale-95 flex items-center justify-center gap-2 ${
              isLastRegularDegree
                ? 'bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 shadow-rose-600/30'
                : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-cyan-600/30'
            }`}
          >
            <span>{isLastRegularDegree ? '👾 К Битве с Вирусом-Боссом!' : 'Следующая Степень'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onBack}
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
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="text-[11px] font-black text-cyan-400 uppercase tracking-wide">
            {activeDegree.title}
          </div>
          <div className="text-xs font-bold text-slate-300">
            Шаг {currentQuestionIdx + 1} из {activeDegree.questions.length}
          </div>
        </div>

        <div className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          +{activeQuestion.base_xp} XP
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1.5 justify-center py-1">
        {activeDegree.questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentQuestionIdx
                ? 'w-8 bg-cyan-400'
                : i < currentQuestionIdx
                ? 'w-4 bg-emerald-500'
                : 'w-4 bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="glass-panel rounded-3xl border border-slate-800 p-5 shadow-xl space-y-4 bg-slate-900/90">
        {activeQuestion.story_context && (
          <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5 flex-1">
              <span className="text-base shrink-0">{currentDrone.emoji}</span>
              <span className="leading-relaxed font-medium">{activeQuestion.story_context}</span>
            </div>
            {isEnglishTopic && (
              <button
                onClick={(e) => speakText(activeQuestion.story_context || '', e)}
                className="p-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 transition active:scale-95 shrink-0"
                title="Послушать произношение"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-black text-slate-100 leading-snug flex-1">
            {activeQuestion.question_text}
          </h3>
          {isEnglishTopic && (
            <button
              onClick={(e) => speakText(activeQuestion.question_text, e)}
              className="p-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 transition active:scale-95 shrink-0"
              title="Послушать вопрос"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5 pt-1">
          {activeQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let btnStyle = 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200';

            if (isAnswered) {
              if (option.is_correct) {
                btnStyle = 'bg-emerald-600/20 border-emerald-500/80 text-emerald-200 glow-emerald';
              } else if (isSelected && !option.is_correct) {
                btnStyle = 'bg-rose-600/20 border-rose-500/80 text-rose-200 glow-rose';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-900 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all duration-200 flex items-center justify-between gap-3 active:scale-[0.98] ${btnStyle}`}
              >
                <span className="flex-1">{option.text}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isEnglishTopic && (
                    <button
                      type="button"
                      onClick={(e) => speakText(option.text, e)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/40 text-cyan-300 transition active:scale-90"
                      title="Послушать фразу"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isAnswered && option.is_correct && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {isAnswered && isSelected && !option.is_correct && (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint Button / Hint Box with Companion Drone */}
      {!isAnswered && !showHint && (
        <button
          onClick={() => {
            setShowHint(true);
            triggerHaptic('light');
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-cyan-300 transition"
        >
          <span className="text-sm">{currentDrone.emoji}</span>
          <span>Подсказка от {currentDrone.name}</span>
        </button>
      )}

      {showHint && !isAnswered && (
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-cyan-300 mb-0.5">Анализ дрона:</div>
            <p className="leading-relaxed text-cyan-200/90">{activeQuestion.hint}</p>
          </div>
        </div>
      )}

      {/* Explanation Box on Answer */}
      {isAnswered && (
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3 bg-slate-900/90">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-200 mb-0.5">Разбор протокола:</div>
              <p className="text-xs text-slate-300 leading-relaxed">{activeQuestion.explanation}</p>
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 text-xs font-black shadow-md shadow-cyan-600/30 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Следующий протокол</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
