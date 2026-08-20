import React, { useState, useEffect } from 'react';
import { X, Share, PlusSquare, CheckCircle, Sparkles, Download } from 'lucide-react';

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Listen for Android / Chrome install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-cyan-500/40 p-6 bg-slate-950 shadow-2xl relative space-y-5 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
            📱
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              Быстрый доступ
            </div>
            <h3 className="text-base font-black text-white font-heading">
              Установить на экран
            </h3>
          </div>
        </div>

        {isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-bold text-emerald-200">Приложение уже установлено!</div>
            <p className="text-xs text-slate-300">
              Вы играете в автономном режиме Кибер-Школы.
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Instructions */
          <div className="space-y-3.5">
            <p className="text-xs text-slate-300 leading-relaxed">
              Чтобы запускать Кибер-Школу как приложение в 1 клик без рамок браузера Safari:
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">1. Нажмите «Поделиться»</div>
                  <div className="text-[11px] text-slate-400">
                    Иконка со стрелочкой вверх внизу или вверху экрана Safari
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">2. Выберите «На экран „Домой“»</div>
                  <div className="text-[11px] text-slate-400">
                    Прокрутите меню вниз и нажмите на плюс
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">3. Нажмите «Добавить»</div>
                  <div className="text-[11px] text-slate-400">
                    Иконка игры с роботом появится на вашем рабочем столе!
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 transition active:scale-95"
            >
              Понятно!
            </button>
          </div>
        ) : (
          /* Android / Chrome Instructions */
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Установите игру на свой телефон или планшет. Она будет работать как настоящее приложение — быстро и без лишних вкладок.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Преимущества приложения:</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 pl-1">
                <li>⚡ Мгновенный запуск с главного экрана</li>
                <li>🎮 Полноэкранный режим без адресной строки</li>
                <li>🔥 Сохранение всего опыта и стриков</li>
              </ul>
            </div>

            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/30 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Установить Кибер-Школу</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-slate-400 text-center">
                  В меню браузера (три точки ⋮) нажмите <strong>«Добавить на главный экран»</strong> или <strong>«Установить приложение»</strong>.
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs transition active:scale-95"
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
