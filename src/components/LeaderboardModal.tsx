import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Flame, Swords, Sparkles, Globe, UserCheck, Cpu } from 'lucide-react';

interface LeaderboardModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'global' | 'grade' | 'friends' | 'duels';

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  profile,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('global');

  if (!isOpen) return null;

  // Base list of all participants
  const allUsers = [
    { rank: 1, nickname: 'Звездный_Стриж', avatar: '🐱', grade: 5, xp: 3450, streak: 12, duelWins: 18, isUser: false, isFriend: true },
    { rank: 2, nickname: 'Логик_Архимаг', avatar: '🦉', grade: 5, xp: 2890, streak: 8, duelWins: 14, isUser: false, isFriend: false },
    { rank: 3, nickname: 'Властелин_Формул', avatar: '🤖', grade: 6, xp: 2100, streak: 5, duelWins: 11, isUser: false, isFriend: true },
    { rank: 4, nickname: profile.nickname, avatar: profile.avatar === 'cat' ? '🐱' : profile.avatar === 'owl' ? '🦉' : profile.avatar === 'robot' ? '🤖' : profile.avatar === 'dragon' ? '🐲' : '🦊', grade: profile.selected_grade, xp: profile.xp, streak: profile.streak_days, duelWins: profile.duel_wins, isUser: true, isFriend: false },
    { rank: 5, nickname: 'Нано_Хакер', avatar: '🐲', grade: 5, xp: 980, streak: 3, duelWins: 6, isUser: false, isFriend: true },
    { rank: 6, nickname: 'Меха_Логик', avatar: '🦉', grade: 5, xp: 890, streak: 4, duelWins: 5, isUser: false, isFriend: true },
    { rank: 7, nickname: 'Мастер_Алгебры', avatar: '👨‍🚀', grade: 7, xp: 620, streak: 2, duelWins: 3, isUser: false, isFriend: false },
    { rank: 8, nickname: 'Кванто_Кот', avatar: '🐱', grade: 4, xp: 450, streak: 1, duelWins: 2, isUser: false, isFriend: false }
  ];

  // Filter based on active tab
  let filteredList = [...allUsers];

  if (activeTab === 'grade') {
    filteredList = allUsers.filter(u => u.grade === profile.selected_grade);
  } else if (activeTab === 'friends') {
    filteredList = allUsers.filter(u => u.isFriend || u.isUser);
  } else if (activeTab === 'duels') {
    filteredList = [...allUsers].sort((a, b) => b.duelWins - a.duelWins);
  } else {
    filteredList = [...allUsers].sort((a, b) => b.xp - a.xp);
  }

  // Recalculate ranks after filter
  const rankedList = filteredList.map((u, i) => ({ ...u, rank: i + 1 }));

  const top1 = rankedList[0];
  const top2 = rankedList[1];
  const top3 = rankedList[2];
  const restList = rankedList.slice(3);

  const currentUserRankInfo = rankedList.find(u => u.isUser);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-amber-500/30 p-5 bg-slate-950 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20">
            🏆
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              Зал Славы
            </div>
            <h3 className="text-base font-black text-white font-heading">
              Таблица Лидеров
            </h3>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 mb-3 shrink-0">
          <button
            onClick={() => setActiveTab('global')}
            className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 ${
              activeTab === 'global'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Общий</span>
          </button>

          <button
            onClick={() => setActiveTab('grade')}
            className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 ${
              activeTab === 'grade'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>{profile.selected_grade} кл.</span>
          </button>

          <button
            onClick={() => setActiveTab('friends')}
            className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 ${
              activeTab === 'friends'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            <span>Друзья</span>
          </button>

          <button
            onClick={() => setActiveTab('duels')}
            className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 ${
              activeTab === 'duels'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Swords className="w-3 h-3" />
            <span>Дуэли</span>
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-16">
          {/* Top 3 Visual Podium */}
          {top1 && (
            <div className="pt-4 pb-2 px-2">
              <div className="flex items-end justify-center gap-2">
                {/* 2nd Place */}
                {top2 && (
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xl mb-1 filter drop-shadow">🥈</div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border-2 border-slate-400 flex items-center justify-center text-xl shadow-md">
                      {top2.avatar}
                    </div>
                    <div className="text-[11px] font-bold text-slate-200 mt-1 truncate max-w-[80px]">
                      {top2.nickname}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400">
                      {activeTab === 'duels' ? `${top2.duelWins} побед` : `${top2.xp} XP`}
                    </div>
                    <div className="w-full h-14 bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-t-2xl border-t border-slate-400/50 mt-1 flex items-center justify-center font-black text-sm text-slate-300">
                      2
                    </div>
                  </div>
                )}

                {/* 1st Place (Center - Higher) */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-2xl mb-1 animate-bounce">👑</div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-xl glow-gold">
                    {top1.avatar}
                  </div>
                  <div className="text-xs font-black text-amber-300 mt-1 truncate max-w-[90px]">
                    {top1.nickname}
                  </div>
                  <div className="text-[10px] font-black text-amber-400">
                    {activeTab === 'duels' ? `${top1.duelWins} побед` : `${top1.xp} XP`}
                  </div>
                  <div className="w-full h-20 bg-gradient-to-t from-amber-600/60 via-amber-500/40 to-yellow-500/50 rounded-t-2xl border-t-2 border-amber-400 mt-1 flex items-center justify-center font-black text-base text-amber-200 glow-gold">
                    1
                  </div>
                </div>

                {/* 3rd Place */}
                {top3 && (
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xl mb-1 filter drop-shadow">🥉</div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border-2 border-amber-700 flex items-center justify-center text-xl shadow-md">
                      {top3.avatar}
                    </div>
                    <div className="text-[11px] font-bold text-slate-200 mt-1 truncate max-w-[80px]">
                      {top3.nickname}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400">
                      {activeTab === 'duels' ? `${top3.duelWins} побед` : `${top3.xp} XP`}
                    </div>
                    <div className="w-full h-10 bg-gradient-to-t from-slate-900 to-slate-800/80 rounded-t-2xl border-t border-amber-700/60 mt-1 flex items-center justify-center font-black text-xs text-amber-600">
                      3
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* List 4+ */}
          <div className="space-y-1.5">
            {restList.map((user) => (
              <div
                key={user.nickname}
                className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2.5 transition ${
                  user.isUser
                    ? 'bg-cyan-950/40 border-cyan-400 glow-indigo'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 text-center font-black text-xs text-slate-400">
                    {user.rank}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-base">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span>{user.nickname}</span>
                      {user.isUser && (
                        <span className="text-[8px] px-1 py-0.2 rounded bg-cyan-400 text-slate-950 font-black">
                          ТЫ
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2">
                      <span className="text-cyan-300">{user.grade} кл.</span>
                      <span className="text-orange-400 flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 fill-orange-400" />
                        {user.streak}д
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-amber-300">
                    {activeTab === 'duels' ? `${user.duelWins} побед` : `${user.xp} XP`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky User Position Card at Bottom */}
        {currentUserRankInfo && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-900/95 border-t border-cyan-500/30 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center shadow">
                #{currentUserRankInfo.rank}
              </div>
              <div>
                <div className="text-xs font-black text-white">Твое место в рейтинге</div>
                <div className="text-[10px] text-cyan-300">
                  {currentUserRankInfo.rank > 1 ? 'Осталось совсем немного до ТОП-3!' : 'Ты на 1-м месте! 🔥'}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-black text-amber-400 flex items-center gap-1 justify-end">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {activeTab === 'duels' ? `${profile.duel_wins} побед` : `${profile.xp} XP`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
