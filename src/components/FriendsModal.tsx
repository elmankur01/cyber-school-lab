import React, { useState } from 'react';
import { Friend, UserProfile } from '../types';
import { MOCK_FRIENDS } from '../data/mockData';
import { X, UserPlus, Copy, Check, Swords, Flame, Sparkles } from 'lucide-react';

interface FriendsModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onStartDuelWithFriend: (friend: Friend) => void;
  onAddFriend: (code: string) => void;
}

export const FriendsModal: React.FC<FriendsModalProps> = ({
  profile,
  isOpen,
  onClose,
  onStartDuelWithFriend,
  onAddFriend
}) => {
  const [copied, setCopied] = useState(false);
  const [friendCodeInput, setFriendCodeInput] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(profile.friend_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = friendCodeInput.trim().toUpperCase();
    if (!cleanCode) return;
    if (cleanCode === profile.friend_code) {
      setFeedbackMsg('Нельзя добавить свой собственный код!');
      return;
    }
    onAddFriend(cleanCode);
    setFriendCodeInput('');
    setFeedbackMsg(`Код ${cleanCode} успешно добавлен!`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-cyan-500/30 p-6 bg-slate-950 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
            👥
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              Кибер-Команда
            </div>
            <h3 className="text-base font-black text-white font-heading">
              Друзья & Соперники
            </h3>
          </div>
        </div>

        {/* My Friend Code Card */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
          <div className="text-[11px] font-bold text-cyan-300 flex items-center justify-between">
            <span>Твой Код Дружбы:</span>
            <span className="text-[10px] text-slate-400">Поделись с одноклассником</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-900 border border-cyan-500/40 rounded-xl px-3.5 py-2 font-mono font-black text-sm text-amber-300 tracking-wider">
              #{profile.friend_code}
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Скопировано' : 'Копировать'}</span>
            </button>
          </div>
        </div>

        {/* Add Friend Input */}
        <form onSubmit={handleAddSubmit} className="space-y-1.5">
          <div className="text-xs font-bold text-slate-300">
            Добавить друга по коду:
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Например: FOX-782"
              value={friendCodeInput}
              onChange={(e) => setFriendCodeInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-md transition active:scale-95 flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Добавить</span>
            </button>
          </div>
          {feedbackMsg && (
            <p className="text-[11px] font-semibold text-amber-300 animate-fade-in pl-1">
              {feedbackMsg}
            </p>
          )}
        </form>

        {/* Friends List */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>Список друзей ({MOCK_FRIENDS.length})</span>
            <span className="text-[10px] text-cyan-400">⚔️ Готовы к дуэли</span>
          </div>

          <div className="space-y-2">
            {MOCK_FRIENDS.map((friend) => {
              return (
                <div
                  key={friend.friend_code}
                  className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl relative">
                      {friend.avatar === 'cat' ? '🐱' : friend.avatar === 'owl' ? '🦉' : friend.avatar === 'robot' ? '🤖' : '🐲'}
                      <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 ${
                        friend.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                        <span>{friend.nickname}</span>
                        <span className="text-[9px] px-1 rounded bg-slate-800 text-cyan-300">
                          {friend.selected_grade}кл
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-amber-300 font-bold flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          {friend.xp} XP
                        </span>
                        <span className="text-orange-400 flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5 fill-orange-400" />
                          {friend.streak_days}д
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartDuelWithFriend(friend)}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 text-white font-black text-xs shadow-md shadow-rose-600/30 transition active:scale-95 flex items-center gap-1"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>Дуэль</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
