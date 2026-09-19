import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, UploadCloud, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useArisan } from '../../context/ArisanContext';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const { importBackup } = useArisan();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      setStatus({ type: 'error', message: 'Harap pilih file dengan format .json ya, Bu!' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const res = importBackup(content);
      if (res.success) {
        setStatus({ type: 'success', message: res.message });
        setTimeout(() => {
          onClose();
          setStatus({ type: 'idle', message: '' });
        }, 1500);
      } else {
        setStatus({ type: 'error', message: res.message });
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Impor File Cadangan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pulihkan data arisan dari file cadangan (.json)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dropzone */}
        <div className="p-5 space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
              dragOver
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Pilih atau Geser File ke Sini
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Mendukung file cadangan versi lama dan baru (.json)
              </p>
            </div>

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              Cari Berkas di HP / Komputer
            </button>
          </div>

          {/* Status feedback */}
          {status.type === 'success' && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-2xl flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'error' && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 text-xs font-semibold rounded-2xl flex items-center gap-2 border border-rose-200 dark:border-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
