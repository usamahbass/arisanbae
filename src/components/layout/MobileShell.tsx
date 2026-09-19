import React from 'react';

interface MobileShellProps {
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-slate-100 to-teal-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 flex justify-center selection:bg-emerald-200 dark:selection:bg-emerald-800">
      {/* Background ambient decorative shapes on large screens */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-rose-300/15 dark:bg-rose-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-amber-300/15 dark:bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile container: max-w-md (approx 448px, iPhone Pro Max width) with shadow on desktop */}
      <div className="w-full max-w-md h-screen h-[100dvh] bg-white dark:bg-slate-900 flex flex-col shadow-2xl relative border-x border-slate-200/80 dark:border-slate-800 transition-colors duration-200 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
