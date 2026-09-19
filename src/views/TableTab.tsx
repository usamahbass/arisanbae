import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useArisan } from '../context/ArisanContext';
import { ArisanMember } from '../types/arisan';
import { formatRupiah } from '../utils/currency';
import { CustomSelect, SelectOption } from '../components/ui/CustomSelect';
import {
  Search,
  CheckCircle2,
  XCircle,
  Crown,
  Send,
  CheckCheck,
  RotateCcw,
  UserPlus,
  Phone,
  AlertCircle,
} from 'lucide-react';

interface TableTabProps {
  onOpenReminderModal: () => void;
}

export const TableTab: React.FC<TableTabProps> = ({ onOpenReminderModal }) => {
  const { activeGroup, setRound, togglePayment, markAllPaid, addMember } = useArisan();

  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [addMemberError, setAddMemberError] = useState<string | null>(null);

  if (!activeGroup) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-500">
        Silakan pilih atau buat arisan terlebih dahulu.
      </div>
    );
  }

  const currentRoundNum = activeGroup.currentRound;
  const currentRound = activeGroup.rounds[currentRoundNum] || {
    roundNumber: currentRoundNum,
    isDrawn: false,
    winnerIds: [],
    payments: {},
  };

  // Filter members based on status filter & global search
  const filteredData = useMemo(() => {
    return activeGroup.members.filter((member) => {
      const isPaid = !!currentRound.payments[member.id];
      if (statusFilter === 'paid' && !isPaid) return false;
      if (statusFilter === 'unpaid' && isPaid) return false;

      if (globalFilter.trim()) {
        const query = globalFilter.toLowerCase();
        return (
          member.name.toLowerCase().includes(query) ||
          (member.phone && member.phone.includes(query))
        );
      }
      return true;
    });
  }, [activeGroup.members, currentRound.payments, statusFilter, globalFilter]);

  // Define TanStack Table columns
  const columns = useMemo<ColumnDef<ArisanMember>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        cell: (info) => (
          <span className="font-bold text-slate-400 text-xs">{info.row.index + 1}.</span>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Nama Peserta',
        cell: (info) => {
          const member = info.row.original;
          return (
            <div className="min-w-0">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5 truncate">
                <span>{member.name}</span>
                {member.hasWon && (
                  <span
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold flex-shrink-0"
                    title={`Pemenang Putaran ke-${member.wonInRound || ''}`}
                  >
                    <Crown className="w-2.5 h-2.5 text-amber-500 fill-amber-400" />
                    Putaran {member.wonInRound}
                  </span>
                )}
              </div>
              {member.phone && (
                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {member.phone}
                </div>
              )}
            </div>
          );
        },
      },
      {
        id: 'paymentStatus',
        header: 'Status Iuran',
        cell: (info) => {
          const member = info.row.original;
          const isPaid = !!currentRound.payments[member.id];

          return (
            <button
              onClick={() => togglePayment(member.id)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm min-h-[38px] ${
                isPaid
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 hover:bg-emerald-200'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 hover:bg-rose-200'
              }`}
              title="Klik untuk mengubah status pembayaran"
            >
              {isPaid ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Lunas</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Belum</span>
                </>
              )}
            </button>
          );
        },
      },
    ],
    [currentRound.payments, togglePayment]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalRounds = Object.keys(activeGroup.rounds).length;
  const paidCount = Object.values(currentRound.payments).filter(Boolean).length;
  const unpaidCount = activeGroup.members.length - paidCount;

  // Round options for CustomSelect
  const roundOptions: SelectOption[] = Array.from({ length: totalRounds }, (_, i) => i + 1).map(
    (r) => ({
      value: r,
      label: `Putaran ke-${r}${activeGroup.rounds[r]?.isDrawn ? ' ✓ (Selesai)' : ''}`,
      description: activeGroup.rounds[r]?.isDrawn ? 'Pemenang sudah diundi' : 'Sedang berjalan',
    })
  );

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) {
      setAddMemberError('Nama peserta wajib diisi ya, Bu!');
      return;
    }
    addMember({ name: newMemberName.trim(), phone: newMemberPhone.trim() });
    setNewMemberName('');
    setNewMemberPhone('');
    setAddMemberError(null);
    setShowAddMember(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-3 animate-fadeIn">
      {/* Top Controls: Round Picker with CustomSelect */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex-1">
          <CustomSelect
            label="Pilih Putaran Arisan"
            value={currentRoundNum}
            onChange={(val) => setRound(Number(val))}
            options={roundOptions}
          />
        </div>

        <div className="text-right pt-5">
          <span className="text-[10px] text-slate-400 block font-medium">Iuran per Orang</span>
          <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
            {formatRupiah(activeGroup.dues)}
          </span>
        </div>
      </div>

      {/* Search Bar & Add Button */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama peserta..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        <button
          onClick={() => setShowAddMember(!showAddMember)}
          className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition flex items-center gap-1 text-xs font-bold shadow-sm"
          title="Tambah Peserta Baru"
        >
          <UserPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Form Tambah Peserta Cepat (Collapsible) with inline error validation */}
      {showAddMember && (
        <form
          onSubmit={handleCreateMember}
          className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2.5 animate-fadeIn text-left"
        >
          <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
            + Tambah Anggota Baru ke Arisan
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nama Peserta (cth: Ibu Linda)"
              value={newMemberName}
              onChange={(e) => {
                setNewMemberName(e.target.value);
                setAddMemberError(null);
              }}
              className={`flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-slate-100 focus:outline-none font-medium ${
                addMemberError
                  ? 'border-2 border-rose-500'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-emerald-500'
              }`}
            />
            <input
              type="tel"
              placeholder="No WA (opsional)"
              value={newMemberPhone}
              onChange={(e) => setNewMemberPhone(e.target.value)}
              className="w-28 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {addMemberError && (
            <div className="text-xs text-rose-500 font-semibold flex items-center gap-1.5 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{addMemberError}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setShowAddMember(false);
                setAddMemberError(null);
              }}
              className="px-3 py-1.5 text-xs text-slate-500 font-semibold hover:text-slate-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs bg-emerald-600 text-white rounded-xl font-bold shadow-sm hover:bg-emerald-700"
            >
              Simpan
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs: Semua, Belum Bayar, Lunas */}
      <div className="flex bg-slate-100 dark:bg-slate-800/70 p-1 rounded-2xl gap-1 text-xs">
        <button
          onClick={() => setStatusFilter('all')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex items-center justify-center gap-1 ${
            statusFilter === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Semua ({activeGroup.members.length})
        </button>

        <button
          onClick={() => setStatusFilter('unpaid')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex items-center justify-center gap-1 ${
            statusFilter === 'unpaid'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50/50'
          }`}
        >
          Belum ({unpaidCount})
        </button>

        <button
          onClick={() => setStatusFilter('paid')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex items-center justify-center gap-1 ${
            statusFilter === 'paid'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          Lunas ({paidCount})
        </button>
      </div>

      {/* Bulk Actions for Bendahara */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAllPaid(true)}
            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
            title="Tandai semua anggota lunas di putaran ini"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai Semua Lunas
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => markAllPaid(false)}
            className="text-[11px] font-medium text-slate-500 hover:text-rose-500 flex items-center gap-1"
            title="Reset pembayaran ke belum bayar"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {unpaidCount > 0 && (
          <button
            onClick={onOpenReminderModal}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            Kirim Tagihan WA
          </button>
        )}
      </div>

      {/* TanStack Table Card Container */}
      <div
        data-tour="table-section"
        className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {table.getRowModel().rows.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Tidak ada peserta yang cocok dengan filter atau pencarian.
            </div>
          ) : (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-700/20 transition"
              >
                {/* Number & Name Column */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
                  {flexRender(row.getVisibleCells()[1].column.columnDef.cell, row.getVisibleCells()[1].getContext())}
                </div>

                {/* Status Toggle Button Column */}
                <div className="flex-shrink-0">
                  {flexRender(row.getVisibleCells()[2].column.columnDef.cell, row.getVisibleCells()[2].getContext())}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
