import React, { useState, useEffect } from 'react';
import { Friend, Question, UserProfile, DuelResult } from '../types';
import { DUEL_BLITZ_QUESTIONS } from '../data/mockData';
import { Timer, Swords, Trophy, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DuelModalProps {
  profile: UserProfile;
  rivalFriend: Friend | null;
  isOpen: boolean;
  onClose: () => void;
  onDuelFinish: (result: DuelResult) => void;
  triggerHaptic: (type: 'success' | 'error' | 'warning' | 'light' | 'medium' | 'heavy') => void;
}

export const DuelModal: React.FC<DuelModalProps> = ({
  profile,
  rivalFriend,
  isOpen,
  onClose,
  onDuelFinish,
  triggerHaptic
}) => {
  const [phase, setPhase] = useState<'lobby' | 'battle' | 'result'>('lobby');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [playerCorrect, setPlayerCorrect] = useState<number>(0);
  const [duelResult, setDuelResult] = useState<DuelResult | null>(null);

  const rivalName = rivalFriend ? rivalFriend.nickname : 'Звездный_Стриж';
  const rivalAvatar = rivalFriend ? (rivalFriend.avatar === 'cat' ? '🐱' : rivalFriend.avatar === 'owl' ? '🦉' : '🤖') : '🐱';

  const questions: Question[] = DUEL_BLITZ_QUESTIONS;
  const activeQuestion: Question = questions[currentQIdx] || questions[0];

  // Timer effect
  useEffect(() => {
    if (phase !== 'battle') return;

    if (timeLeft <= 0) {
      finishBattle(playerCorrect, 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, phase, playerCorrect]);

  const startBattle = () => {
    setTimeLeft(60);
    setCurrentQIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setPlayerCorrect(0);
    setPhase('battle');
    triggerHaptic('medium');
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || phase !== 'battle') return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = activeQuestion.options.find(o => o.id === optionId)?.is_correct;
    if (isCorrect) {
      triggerHaptic('success');
      setPlayerCorrect(prev => prev + 1);
    } else {
      triggerHaptic('error');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);

    if (currentQIdx + 1 < questions.length) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      const timeSpent = 60 - timeLeft;
      finishBattle(playerCorrect, timeSpent);
    }
  };

  const finishBattle = (correctAnswers: number, timeSpent: number) => {
    // Player score = correct * 100 + remaining seconds * 2
    const remainingTime = Math.max(0, 60 - timeSpent);
    const playerScore = (correctAnswers * 100) + (remainingTime * 2);

    // Simulated Rival performance (e.g. 2 correct, 38 sec)
    const rivalCorrect = Math.random() > 0.4 ? 2 : 3;
    const rivalTimeSpent = Math.floor(Math.random() * 20) + 30; // 30-50 sec
    const rivalScore = (rivalCorrect * 100) + (Math.max(0, 60 - rivalTimeSpent) * 2);

    const isWin = playerScore >= rivalScore;
    const earnedXp = isWin ? 100 : 30;

    const result: DuelResult = {
      player_score: playerScore,
      player_time_spent: timeSpent,
      player_correct: correctAnswers,
      rival_name: rivalName,
      rival_avatar: rivalAvatar,
      rival_score: rivalScore,
      rival_time_spent: rivalTimeSpent,
      rival_correct: rivalCorrect,
      is_win: isWin,
      earned_xp: earnedXp
    };

    setDuelResult(result);
    setPhase('result');
    onDuelFinish(result);

    if (isWin) {
      triggerHaptic('heavy');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } else {
      triggerHaptic('warning');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-rose-500/40 p-5 bg-slate-950 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LOBBY PHASE */}
        {phase === 'lobby' && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-3xl shadow-xl glow-rose">
              ⚔️
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                PvP Кибер-Арена
              </div>
              <h3 className="text-xl font-black text-white font-heading mt-0.5">
                Дуэль на время: 60 сек
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                3 быстрых вопроса. Побеждает тот, кто ответит точнее и быстрее!
              </p>
            </div>

            {/* VS Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-around gap-3">
              {/* Player */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-2xl">
                  {profile.avatar === 'cat' ? '🐱' : profile.avatar === 'owl' ? '🦉' : profile.avatar === 'robot' ? '🤖' : '🦊'}
                </div>
                <div className="text-xs font-black text-white truncate max-w-[90px]">
                  {profile.nickname}
                </div>
                <div className="text-[10px] text-cyan-300 font-bold">
                  {profile.duel_wins} побед
                </div>
              </div>

              {/* VS Badge */}
              <div className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500 text-rose-400 font-black text-xs flex items-center justify-center animate-pulse">
                VS
              </div>

              {/* Rival */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-600/30 border border-orange-400 flex items-center justify-center text-2xl">
                  {rivalAvatar}
                </div>
                <div className="text-xs font-black text-white truncate max-w-[90px]">
                  {rivalName}
                </div>
                <div className="text-[10px] text-orange-300 font-bold">
                  Соперник
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-200 flex items-center gap-2 text-left">
              <Zap className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Бонус за скорость: каждая сохраненная секунда дает +2 очка!</span>
            </div>

            <button
              onClick={startBattle}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 hover:from-rose-500 text-white font-black text-sm shadow-xl shadow-rose-600/30 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span>В БОЙ! Начать дуэль</span>
            </button>
          </div>
        )}

        {/* BATTLE PHASE */}
        {phase === 'battle' && (
          <div className="space-y-4">
            {/* Header with Countdown */}
            <div className="flex items-center justify-between">
              <div className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                <Swords className="w-4 h-4" />
                <span>Вопрос {currentQIdx + 1} из {questions.length}</span>
              </div>

              <div className={`flex items-center gap-1 px-3 py-1 rounded-xl border font-mono font-black text-xs ${
                timeLeft < 15 ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse' : 'bg-slate-900 border-slate-700 text-amber-300'
              }`}>
                <Timer className="w-3.5 h-3.5" />
                <span>{timeLeft} сек</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300">
                {activeQuestion.story_context}
              </div>
              <h4 className="text-sm font-black text-white leading-snug">
                {activeQuestion.question_text}
              </h4>

              <div className="space-y-2 pt-1">
                {activeQuestion.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200';

                  if (isAnswered) {
                    if (option.is_correct) {
                      btnStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-200 glow-emerald';
                    } else if (isSelected && !option.is_correct) {
                      btnStyle = 'bg-rose-600/30 border-rose-400 text-rose-200 glow-rose';
                    } else {
                      btnStyle = 'bg-slate-900 border-slate-800 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between gap-2 active:scale-95 ${btnStyle}`}
                    >
                      <span>{option.text}</span>
                      {isAnswered && option.is_correct && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isAnswered && isSelected && !option.is_correct && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>{currentQIdx + 1 < questions.length ? 'Следующий вопрос' : 'Завершить дуэль'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* RESULT PHASE */}
        {phase === 'result' && duelResult && (
          <div className="text-center space-y-4 py-2">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl shadow-2xl glow-gold animate-bounce">
              {duelResult.is_win ? '👑' : '🤝'}
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 border border-amber-500/40 text-amber-300 mb-1">
                {duelResult.is_win ? '🎉 ПОБЕДА В ДУЭЛИ!' : 'ХОРОШАЯ БИТВА!'}
              </div>
              <h3 className="text-lg font-black text-white">
                {duelResult.is_win ? 'Ты обогнал соперника!' : 'Соперник оказался чуть быстрее!'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Получено: <strong className="text-amber-400">+{duelResult.earned_xp} Кибер-XP</strong>
              </p>
            </div>

            {/* Score Comparison Table */}
            <div className="grid grid-cols-2 gap-2 text-left">
              {/* Player Card */}
              <div className={`p-3 rounded-2xl border ${
                duelResult.is_win ? 'bg-emerald-950/40 border-emerald-500/50 glow-emerald' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="text-xs font-black text-white flex items-center gap-1">
                  <span>Ты</span>
                  {duelResult.is_win && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-lg font-black text-amber-300 mt-1">
                  {duelResult.player_score} очков
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5 mt-1">
                  <div>✅ Верно: {duelResult.player_correct} / {questions.length}</div>
                  <div>⏱️ Время: {duelResult.player_time_spent} сек</div>
                </div>
              </div>

              {/* Rival Card */}
              <div className={`p-3 rounded-2xl border ${
                !duelResult.is_win ? 'bg-emerald-950/40 border-emerald-500/50 glow-emerald' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="text-xs font-black text-white flex items-center gap-1">
                  <span className="truncate">{duelResult.rival_name}</span>
                  {!duelResult.is_win && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-lg font-black text-amber-300 mt-1">
                  {duelResult.rival_score} очков
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5 mt-1">
                  <div>✅ Верно: {duelResult.rival_correct} / {questions.length}</div>
                  <div>⏱️ Время: {duelResult.rival_time_spent} сек</div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={startBattle}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Реванш / Еще одна дуэль</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-6 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
              >
                Вернуться в главное меню
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
