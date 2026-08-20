import React, { useState } from 'react';
import { UserProfile, CyberShopItem } from '../types';
import { CYBER_SHOP_ITEMS } from '../data/mockData';
import { X, ShoppingBag, Sparkles, Check, Lock, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CyberShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onBuyItem: (item: CyberShopItem) => void;
  onEquipFrame: (frameClass: string | undefined) => void;
}

export const CyberShopModal: React.FC<CyberShopModalProps> = ({
  isOpen,
  onClose,
  profile,
  onBuyItem,
  onEquipFrame
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'drone_skin' | 'avatar_frame' | 'title'>('all');

  if (!isOpen) return null;

  const filteredItems = CYBER_SHOP_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleBuy = (item: CyberShopItem) => {
    if (profile.xp < item.price_xp) return;
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    onBuyItem(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-purple-500/30 p-6 bg-slate-950 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between pr-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
              🛍️
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                Кибер-Маркет
              </div>
              <h3 className="text-base font-black text-white font-heading">
                Магазин Улучшений
              </h3>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{profile.xp} XP</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setSelectedCategory('drone_skin')}
            className={`px-3 py-1.5 rounded-xl transition shrink-0 ${
              selectedCategory === 'drone_skin'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🤖 Скины
          </button>
          <button
            onClick={() => setSelectedCategory('avatar_frame')}
            className={`px-3 py-1.5 rounded-xl transition shrink-0 ${
              selectedCategory === 'avatar_frame'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💠 Рамки
          </button>
          <button
            onClick={() => setSelectedCategory('title')}
            className={`px-3 py-1.5 rounded-xl transition shrink-0 ${
              selectedCategory === 'title'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👑 Титулы
          </button>
        </div>

        {/* Item Cards List */}
        <div className="space-y-3 pt-1">
          {filteredItems.map((item) => {
            const isOwned = profile.inventory?.includes(item.id);
            const isEquipped = item.category === 'avatar_frame' && profile.active_frame === item.preview_effect;
            const canAfford = profile.xp >= item.price_xp;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition ${
                  isOwned
                    ? 'bg-slate-900/80 border-purple-500/40'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shrink-0 mt-0.5 ${item.preview_effect || ''}`}>
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {isOwned && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
                            Куплено
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {!isOwned && (
                      <div className="text-xs font-black text-amber-400 flex items-center justify-end gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {item.price_xp} XP
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center justify-end gap-2">
                  {isOwned ? (
                    item.category === 'avatar_frame' ? (
                      isEquipped ? (
                        <button
                          onClick={() => onEquipFrame(undefined)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition"
                        >
                          Снять рамку
                        </button>
                      ) : (
                        <button
                          onClick={() => onEquipFrame(item.preview_effect)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black shadow-md transition active:scale-95 flex items-center gap-1"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Надеть</span>
                        </button>
                      )
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>В инвентаре</span>
                      </div>
                    )
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition active:scale-95 flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Купить за {item.price_xp} XP</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Не хватает {item.price_xp - profile.xp} XP</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
