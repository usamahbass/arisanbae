import React from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  subtext?: string;
  animate?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 36,
  className = '',
  showText = false,
  textClassName = '',
  subtext,
  animate = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Scalable Vector Emblem */}
      <div
        style={{ width: size, height: size }}
        className={`relative flex-shrink-0 select-none ${
          animate ? 'hover:scale-105 transition-transform duration-300' : ''
        }`}
      >
        <svg
          viewBox="0 0 512 512"
          width="100%"
          height="100%"
          className="drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Emerald Teal Gradient */}
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="30%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>

            {/* Golden Coin Outer Gradient */}
            <linearGradient id="logoGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Golden Coin Inner Gradient */}
            <linearGradient id="logoGoldInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#047857" floodOpacity="0.3" />
            </filter>
            <filter id="logoCoinShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#022c22" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Squircle Base with Soft Shadow */}
          <rect
            x="24"
            y="24"
            width="464"
            height="464"
            rx="124"
            fill="url(#logoBgGrad)"
            filter="url(#logoGlow)"
          />

          {/* Subtle Inner Ring */}
          <rect
            x="36"
            y="36"
            width="440"
            height="440"
            rx="112"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="6"
          />

          {/* Golden Lottery Coin */}
          <g filter="url(#logoCoinShadow)">
            <circle cx="256" cy="256" r="148" fill="url(#logoGoldOuter)" />
            <circle
              cx="256"
              cy="256"
              r="136"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="4"
              strokeDasharray="10 6"
            />
            <circle cx="256" cy="256" r="124" fill="url(#logoGoldInner)" />
          </g>

          {/* Blossom Petals Motif in Center */}
          <g fill="#78350f" opacity="0.9">
            <path d="M256 168 C240 196 244 218 256 226 C268 218 272 196 256 168 Z" />
            <path d="M256 344 C240 316 244 294 256 286 C268 294 272 316 256 344 Z" />
            <path d="M168 256 C196 240 218 244 226 256 C218 268 196 272 168 256 Z" />
            <path d="M344 256 C316 240 294 244 286 256 C294 268 316 272 344 256 Z" />
          </g>

          {/* Golden Center Star */}
          <path
            d="M256 208 L269 243 L304 256 L269 269 L256 304 L243 269 L208 256 L243 243 Z"
            fill="#ffffff"
          />
          <circle cx="256" cy="256" r="10" fill="#f59e0b" />

          {/* Sparkles */}
          <g transform="translate(390, 110) scale(1.1)">
            <path d="M0 -30 Q0 0 30 0 Q0 0 0 30 Q0 0 -30 0 Q0 0 0 -30 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="6" fill="#fef08a" />
          </g>
          <circle cx="340" cy="80" r="6" fill="#ffffff" opacity="0.8" />
          <circle cx="430" cy="170" r="5" fill="#fef08a" opacity="0.75" />

          <g transform="translate(118, 388) scale(0.75)">
            <path d="M0 -26 Q0 0 26 0 Q0 0 0 26 Q0 0 -26 0 Q0 0 0 -26 Z" fill="#ffffff" opacity="0.9" />
            <circle cx="0" cy="0" r="5" fill="#fef08a" />
          </g>
        </svg>
      </div>

      {/* Typography if showText is true */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={`font-black tracking-tight text-slate-900 dark:text-white ${
              textClassName || 'text-lg'
            }`}
          >
            Arisan<span className="text-emerald-600 dark:text-emerald-400">Bae</span>
          </span>
          {subtext && (
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-0.5">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
