import React, { useState, useEffect, useRef } from 'react';
import { Friend, Question, UserProfile, DuelResult } from '../types';
import { DUEL_BLITZ_QUESTIONS, ANONYMOUS_NICKNAMES } from '../data/mockData';
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

  const playerCorrectRef = useRef(playerCorrect);
  playerCorrectRef.current = playerCorrect;
  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;

  const rivalName = rivalFriend 
    ? rivalFriend.nickname 
    : ANONYMOUS_NICKNAMES[Math.floor(Math.random() * ANONYMOUS_NICKNAMES.length)] + '_' + Math.floor(10 + Math.random() * 90);
  const rivalAvatar = rivalFriend ? (rivalFriend.avatar === 'cat' ? '🐱' : rivalFriend.avatar === 'owl' ? '🦉' : '🤖') : '🐱';

  const questions: Question[] = DUEL_BLITZ_QUESTIONS;
  const activeQuestion: Question = questions[currentQIdx] || questions[0];

  const finishBattle = (correctAnswers: number, timeSpent: number) => {
    const remainingTime = Math.max(0, 60 - timeSpent);
    const playerScore = (correctAnswers * 100) + (remainingTime * 2);

    // Simulated Rival performance
    const rivalCorrect = Math.random() > 0.45 ? 2 : 3;
    const rivalTimeSpent = Math.floor(Math.random() * 18) + 32; // 32-50 sec
    const rivalRemaining = Math.max(0, 60 - rivalTimeSpent);
    const rivalScore = (rivalCorrect * 100) + (rivalRemaining * 2);

    const isWin = playerScore >= rivalScore;
    const earnedXp = isWin ? 100 : 30;

    const res: DuelResult = {
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

    setDuelResult(res);
    setPhase('result');
    onDuelFinish(res);

    if (isWin) {
      triggerHaptic('heavy');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      triggerHaptic('warning');
    }
  };

  // Timer effect
  useEffect(() => {
    if (phase !== 'battle') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishBattle(playerCorrectRef.current, 60);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-rose-500/30 p-6 bg-slate-950 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* PHASE 1: LOBBY */}
        {phase === 'lobby' && (
          <div className="space-y-6 pt-2 text-center">
            <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <Swords className="w-4 h-4 text-rose-500" />
              <span>PvP Кибер-Арена (60 сек)</span>
            </div>

            <div className="flex items-center justify-around py-3">
              {/* You */}
              <div className="space-y-1.5 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400 ${profile.active_frame || ''}`}>
                  {profile.avatar === 'cat' ? '🐱' : profile.avatar === 'owl' ? '🦉' : profile.avatar === 'robot' ? '🤖' : profile.avatar === 'dragon' ? '🐲' : '🦊'}
                </div>
                <div className="text-xs font-black text-white">{profile.nickname}</div>
                <div className="text-[10px] text-cyan-300 font-bold">Ты ({profile.selected_grade} кл)</div>
              </div>

              {/* VS Badge */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 flex items-center justify-center font-black text-sm text-white shadow-xl glow-rose animate-pulse">
                VS
              </div>

              {/* Rival */}
              <div className="space-y-1.5 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-rose-600 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/30 ring-2 ring-rose-400">
                  {rivalAvatar}
                </div>
                <div className="text-xs font-black text-white">{rivalName}</div>
                <div className="text-[10px] text-rose-300 font-bold">Соперник (Онлайн)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-left space-y-1.5">
              <div className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Правила дуэли:</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 pl-1">
                <li>• <strong>3 блиц-вопроса</strong> на логику, счет и грамматику</li>
                <li>• <strong>Бонус скорости:</strong> +2 очка за каждую оставшуюся секунду!</li>
                <li>• Награда: <strong>+100 XP</strong> за победу!</li>
              </ul>
            </div>

            <button
              onClick={startBattle}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 hover:from-rose-500 text-white font-black text-sm shadow-xl shadow-rose-600/30 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span>НАЧАТЬ ДУЭЛЬ!</span>
            </button>
          </div>
        )}

        {/* PHASE 2: BATTLE */}
        {phase === 'battle' && (
          <div className="space-y-4 pt-1">
            {/* Header with timer */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold text-slate-300">
                Вопрос <span className="text-rose-400 font-black">{currentQIdx + 1}</span> из {questions.length}
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-black text-sm ${
                timeLeft < 15
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-amber-300'
              }`}>
                <Timer className="w-3.5 h-3.5" />
                <span>{timeLeft} сек</span>
              </div>
            </div>

            {/* Question */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                {activeQuestion.story_context}
              </div>
              <h3 className="text-sm font-extrabold text-white leading-snug">
                {activeQuestion.question_text}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {activeQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

                if (isAnswered) {
                  if (option.is_correct) {
                    btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-200';
                  } else if (isSelected && !option.is_correct) {
                    btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-600';
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition flex items-center justify-between gap-2 active:scale-[0.98] ${btnStyle}`}
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

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white text-xs font-black shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>{currentQIdx + 1 < questions.length ? 'Следующий вопрос' : 'Завершить дуэль'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* PHASE 3: RESULT */}
        {phase === 'result' && duelResult && (
          <div className="space-y-4 pt-2 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-3xl shadow-xl">
              {duelResult.is_win ? '👑' : '🤝'}
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Результат Дуэли
              </div>
              <h3 className="text-xl font-black text-white font-heading">
                {duelResult.is_win ? 'Блестящая Победа!' : 'Достойный Бой!'}
              </h3>
            </div>

            {/* Comparison Board */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div className={`p-3 rounded-xl border text-center space-y-1 ${
                duelResult.is_win ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="text-[10px] text-cyan-300 font-bold">Ты ({profile.nickname})</div>
                <div className="text-xl font-black text-white">{duelResult.player_score}</div>
                <div className="text-[9px] text-slate-400">
                  {duelResult.player_correct}/3 верно • {duelResult.player_time_spent}с
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-center space-y-1 ${
                !duelResult.is_win ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="text-[10px] text-rose-300 font-bold">{duelResult.rival_name}</div>
                <div className="text-xl font-black text-white">{duelResult.rival_score}</div>
                <div className="text-[9px] text-slate-400">
                  {duelResult.rival_correct}/3 верно • {duelResult.rival_time_spent}с
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>+{duelResult.earned_xp} XP начислено в профиль!</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={startBattle}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Реванш</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs transition"
              >
                В меню
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
