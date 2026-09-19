import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RupiahInputProps {
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  id?: string;
}

export const RupiahInput: React.FC<RupiahInputProps> = ({
  value,
  onChange,
  placeholder = '0',
  error = false,
  errorMessage,
  label,
  required = false,
  helperText,
  id,
}) => {
  // Format numeric value to Indonesian thousand separated string (e.g. 100000 -> "100.000")
  const displayValue = value === 0 ? '' : new Intl.NumberFormat('id-ID').format(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip everything except numeric digits
    const digitsOnly = e.target.value.replace(/\D/g, '');
    const num = digitsOnly ? parseInt(digitsOnly, 10) : 0;
    onChange(num);
  };

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {/* Static currency prefix */}
        <div className="absolute left-3.5 pointer-events-none flex items-center text-xs font-extrabold text-slate-400 dark:text-slate-500 select-none">
          Rp
        </div>

        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className={`w-full pl-10 pr-4 py-3 text-sm font-bold rounded-2xl transition-all focus:outline-none ${
            error
              ? 'border-2 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-400'
              : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500'
          }`}
        />
      </div>

      {/* Inline Error Message */}
      {error && errorMessage && (
        <div className="text-xs text-rose-500 font-semibold flex items-center gap-1.5 mt-1 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Helper text if no error */}
      {!error && helperText && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};
