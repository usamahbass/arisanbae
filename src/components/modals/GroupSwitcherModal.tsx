import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Check, Trash2, FolderSync, Users, Calendar } from 'lucide-react';
import { useArisan } from '../../context/ArisanContext';
import { formatRupiah } from '../../utils/currency';

interface GroupSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreate: () => void;
  onOpenImport: () => void;
}

export const GroupSwitcherModal: React.FC<GroupSwitcherModalProps> = ({
  isOpen,
  onClose,
  onOpenCreate,
  onOpenImport,
}) => {
  const { state, activeGroup, setActiveGroupId, deleteGroup } = useArisan();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleteConfirmId === groupId) {
      deleteGroup(groupId);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(groupId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Kelola Grup Arisan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih arisan yang ingin dilihat atau kelola
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Group List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {state.groups.map((group) => {
            const isActive = activeGroup?.id === group.id;
            const isConfirmingDelete = deleteConfirmId === group.id;

            return (
              <div
                key={group.id}
                onClick={() => {
                  setActiveGroupId(group.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/70'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                      {group.name}
                    </h4>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        Aktif
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {group.members.length} Peserta
                    </span>
                    <span>•</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(group.dues)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {state.groups.length > 1 && (
                    <button
                      onClick={(e) => handleDelete(group.id, e)}
                      className={`p-2 rounded-xl text-xs font-semibold transition ${
                        isConfirmingDelete
                          ? 'bg-rose-600 text-white px-3'
                          : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                      }`}
                      title="Hapus grup arisan ini"
                    >
                      {isConfirmingDelete ? 'Yakin Hapus?' : <Trash2 className="w-4 h-4" />}
                    </button>
                  )}
                  {isActive && !isConfirmingDelete && (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenCreate();
            }}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition active:scale-98"
          >
            <Plus className="w-4 h-4" />
            + Buat Grup Arisan Baru
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenImport();
            }}
            className="w-full py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <FolderSync className="w-4 h-4 text-emerald-600" />
            Impor File Cadangan (.json)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
