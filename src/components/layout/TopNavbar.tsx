import React from 'react';
import { useArisan } from '../../context/ArisanContext';
import { ChevronDown, Moon, Sun, HelpCircle } from 'lucide-react';
import { AppLogo } from '../ui/AppLogo';

interface TopNavbarProps {
  onOpenGroupSwitcher: () => void;
  onOpenTour: () => void;
  onOpenBot: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenGroupSwitcher,
  onOpenTour,
  onOpenBot,
}) => {
  const { activeGroup, state, toggleTheme } = useArisan();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Logo & Group Switcher */}
        <div className="flex items-center gap-2.5 min-w-0">
          <AppLogo size={38} animate className="flex-shrink-0" />

          <button
            data-tour="header-group"
            onClick={onOpenGroupSwitcher}
            className="flex flex-col text-left min-w-0 group hover:opacity-85 active:scale-98 transition"
            title="Ganti atau kelola grup arisan"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ArisanBae
            </span>
            <div className="flex items-center gap-1 text-slate-800 dark:text-slate-100 font-bold text-base leading-tight truncate">
              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                {activeGroup ? activeGroup.name : 'Pilih / Buat Arisan'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
            </div>
          </button>
        </div>

        {/* Right: Round badge, Bot, Tour Guide, & Dark Mode Toggle */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {activeGroup && (
            <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <span>Putaran</span>
              <span className="bg-emerald-600 text-white rounded-full w-4 h-4 text-[10px] inline-flex items-center justify-center font-bold">
                {activeGroup.currentRound}
              </span>
            </div>
          )}

          {/* Tanya Bubu Bot Button */}
          <button
            onClick={onOpenBot}
            className="p-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors active:scale-95 flex items-center gap-1 shadow-sm"
            aria-label="Tanya Bubu (Asisten Offline)"
            title="Tanya Bubu (Asisten & Kamus Fitur Offline)"
          >
            <span className="text-sm leading-none">🤖</span>
            <span className="text-[10px] font-extrabold tracking-wider">
              Bubu
            </span>
          </button>

          {/* Tour Guide Button */}
          <button
            onClick={onOpenTour}
            className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Panduan Aplikasi"
            title="Lihat Panduan Aplikasi"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Ganti tema warna"
            title={state.theme === 'dark' ? 'Ubah ke mode terang' : 'Ubah ke mode gelap'}
          >
            {state.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
