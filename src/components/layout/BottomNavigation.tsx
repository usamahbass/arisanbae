import React from 'react';
import { Home, ClipboardCheck, Dices, History } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabType = 'home' | 'table' | 'lottery' | 'history';

interface BottomNavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Beranda',
      icon: Home,
    },
    {
      id: 'table' as TabType,
      label: 'Iuran',
      icon: ClipboardCheck,
    },
    {
      id: 'lottery' as TabType,
      label: 'Undi',
      icon: Dices,
      isSpecial: true,
    },
    {
      id: 'history' as TabType,
      label: 'Riwayat',
      icon: History,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-3 py-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg transition-colors">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-rose-500/30 scale-105 ring-4 ring-rose-100 dark:ring-rose-950'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-600/30 group-hover:scale-105 active:scale-95'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <span
                  className={`text-[11px] font-bold mt-1 tracking-tight ${
                    isActive
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-600 dark:text-slate-400 font-medium'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[64px] min-h-[48px] rounded-2xl transition-colors active:scale-95"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 transition-transform ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 scale-110'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600'
                }`}
              />
              <span
                className={`text-[11px] relative z-10 font-medium mt-1 leading-none ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
