import React from 'react';
import { UserProfile } from '../types';
import { RANK_TIERS, COMPANION_DRONES } from '../data/mockData';
import { Flame, Trophy, Award, Sparkles, Swords, Users, Target, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  profile: UserProfile;
  onOpenProfile: () => void;
  onOpenAchievements: () => void;
  onOpenLeaderboard: () => void;
  onOpenFriends: () => void;
  onOpenDuels: () => void;
  onOpenQuests: () => void;
  onOpenShop: () => void;
  dailyQuestsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenProfile,
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenFriends,
  onOpenDuels,
  onOpenQuests,
  onOpenShop,
  dailyQuestsCount = 0
}) => {
  const currentTier = RANK_TIERS.find(t => profile.xp >= t.minXp && profile.xp < t.maxXp) || RANK_TIERS[RANK_TIERS.length - 1];
  const nextTier = RANK_TIERS.find(t => t.level === currentTier.level + 1);
  
  const xpInCurrentTier = profile.xp - currentTier.minXp;
  const xpNeededForNext = nextTier ? nextTier.minXp - currentTier.minXp : 1000;
  const progressPercent = nextTier ? Math.min(100, Math.round((xpInCurrentTier / xpNeededForNext) * 100)) : 100;

  const currentDrone = COMPANION_DRONES.find(d => d.id === profile.drone_id) || COMPANION_DRONES[0];

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-cyan-500/20 px-3 py-2.5 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1.5">
        {/* User & Drone Button */}
        <button 
          onClick={onOpenProfile}
          className={`flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-500/30 rounded-2xl p-1.5 pr-2.5 transition active:scale-95 text-left ${profile.active_frame || ''}`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center text-lg shadow-lg relative shrink-0">
            <span>{currentDrone.emoji}</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-black bg-cyan-400 text-slate-950 px-1 rounded border border-slate-900">
              {profile.selected_grade}к
            </span>
          </div>
          <div>
            <div className="text-[11px] font-black text-cyan-200 truncate max-w-[85px]">
              {profile.nickname}
            </div>
            <div className="text-[9px] font-bold text-amber-400 flex items-center gap-0.5">
              <span>{currentTier.badge}</span>
              <span className="truncate max-w-[75px]">{currentTier.name}</span>
            </div>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Daily Quests Button */}
          <button
            onClick={onOpenQuests}
            className="p-2 rounded-xl bg-slate-900/90 border border-amber-500/40 text-amber-400 hover:text-amber-300 active:scale-95 transition relative shadow-sm"
            title="Квесты Дня"
          >
            <Target className="w-4 h-4 text-amber-400 animate-spin-slow" />
            {dailyQuestsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center ring-2 ring-slate-950">
                {dailyQuestsCount}
              </span>
            )}
          </button>

          {/* Cyber Shop Button */}
          <button
            onClick={onOpenShop}
            className="p-2 rounded-xl bg-slate-900/90 border border-purple-500/40 text-purple-400 hover:text-purple-300 active:scale-95 transition shadow-sm"
            title="Магазин"
          >
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </button>

          {/* Duel PvP Button */}
          <button
            onClick={onOpenDuels}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-gradient-to-r from-rose-600/40 to-orange-600/40 hover:from-rose-600/60 border border-rose-500/50 text-rose-300 text-xs font-black transition active:scale-95 shadow-sm"
            title="PvP Дуэли"
          >
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden xs:inline">Дуэль</span>
          </button>

          {/* Friends Button */}
          <button
            onClick={onOpenFriends}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 active:scale-95 transition"
            title="Друзья"
          >
            <Users className="w-3.5 h-3.5" />
          </button>

          {/* Leaderboard */}
          <button 
            onClick={onOpenLeaderboard}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 active:scale-95 transition"
            title="Таблица лидеров"
          >
            <Trophy className="w-3.5 h-3.5" />
          </button>

          {/* Achievements */}
          <button 
            onClick={onOpenAchievements}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 active:scale-95 transition relative"
            title="Достижения"
          >
            <Award className="w-3.5 h-3.5" />
            {profile.achievements.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full ring-2 ring-slate-950 animate-pulse"></span>
            )}
          </button>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="max-w-md mx-auto mt-2">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 mb-1">
          <span className="flex items-center gap-1 text-cyan-300">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {profile.xp} XP
          </span>
          <div className="flex items-center gap-2">
            <span className="text-orange-400 flex items-center gap-0.5 font-bold">
              <Flame className="w-3 h-3 fill-orange-400" />
              {profile.streak_days}д стрик
            </span>
            {nextTier ? (
              <span className="text-slate-400">До «{nextTier.name}»: <strong className="text-amber-400">{nextTier.minXp - profile.xp}</strong></span>
            ) : (
              <span className="text-amber-400">МАКС</span>
            )}
          </div>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
