import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  X,
  Sparkles,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  CheckCircle2,
  UserPlus,
  AlertCircle,
  Users,
  Coins,
  FileText,
} from "lucide-react";
import { useArisan } from "../../context/ArisanContext";
import { RupiahInput } from "../ui/RupiahInput";
import { CustomSelect, SelectOption } from "../ui/CustomSelect";
import { AppLogo } from "../ui/AppLogo";

interface CreateArisanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Zod schema for Step 1 & Step 2 form values
const arisanFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama kelompok arisan minimal 3 huruf ya, Bu!" })
    .max(60, {
      message: "Nama kelompok arisan terlalu panjang (maksimal 60 huruf).",
    }),
  manager: z
    .string()
    .min(2, {
      message: "Nama pengelola / bendahara wajib diisi minimal 2 huruf.",
    })
    .max(60, {
      message: "Nama pengelola terlalu panjang (maksimal 60 huruf).",
    }),
  dues: z
    .number()
    .min(1000, { message: "Iuran arisan minimal Rp 1.000 ya, Bu!" }),
  wages: z
    .number()
    .min(0, { message: "Uang kas tidak boleh bernilai negatif." }),
  winnersCount: z
    .number()
    .min(1, { message: "Jumlah pemenang minimal 1 orang per putaran." }),
  periodType: z.enum(["bulanan", "mingguan", "harian"]),
});

type FormValues = z.infer<typeof arisanFormSchema>;

interface ManualMemberItem {
  name: string;
  phone: string;
}

export const CreateArisanModal: React.FC<CreateArisanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createGroup } = useArisan();

  // Step state: 1 (Info), 2 (Nominal & Jadwal), 3 (Daftar Peserta)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Mode for Step 3: 'batch' (WA Paste) or 'manual' (One by one)
  const [inputMode, setInputMode] = useState<"batch" | "manual">("batch");
  const [batchText, setBatchText] = useState(
    "1. Ibu Siti Aminah\n2. Ibu Nurul Hidayah\n3. Ibu Dewi Sartika\n4. Ibu Fatimah Zahra\n5. Ibu Sri Wahyuni",
  );
  const [manualMembers, setManualMembers] = useState<ManualMemberItem[]>([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);

  const [memberError, setMemberError] = useState<string | null>(null);

  const {
    register,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(arisanFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      manager: "",
      dues: 100000,
      wages: 0,
      winnersCount: 1,
      periodType: "bulanan",
    },
  });

  if (!isOpen) return null;

  // Options for custom selects
  const winnerOptions: SelectOption[] = [
    { value: 1, label: "1 Orang per undian" },
    { value: 2, label: "2 Orang per undian" },
    { value: 3, label: "3 Orang per undian" },
    { value: 4, label: "4 Orang per undian" },
  ];

  const periodOptions: SelectOption[] = [
    { value: "bulanan", label: "Tiap Bulan (Bulanan)" },
    { value: "mingguan", label: "Tiap Minggu (Mingguan)" },
    { value: "harian", label: "Tiap Hari (Harian)" },
  ];

  // Helper to parse WhatsApp pasted text into clean names
  const parseBatchNames = (
    text: string,
  ): Array<{ name: string; phone?: string }> => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        // Strip numbering like "1. ", "1) ", "01. ", "-", "*", "•"
        const cleaned = line
          .replace(/^[\d]+[\.\)\-\s\:]+/, "")
          .replace(/^[\-\*\•\+]\s*/, "")
          .trim();
        return { name: cleaned, phone: "" };
      })
      .filter((m) => m.name.length > 0);
  };

  // Step 1 -> Step 2 validation & transition
  const handleStep1Next = async () => {
    const isValid = await trigger(["name", "manager"]);
    if (isValid) {
      setStep(2);
    }
  };

  // Step 2 -> Step 3 validation & transition
  const handleStep2Next = async () => {
    const isValid = await trigger([
      "dues",
      "wages",
      "winnersCount",
      "periodType",
    ]);
    if (isValid) {
      setStep(3);
    }
  };

  // Step 3: Manual member list helpers
  const handleAddManualRow = () => {
    setManualMembers((prev) => [...prev, { name: "", phone: "" }]);
    setMemberError(null);
  };

  const handleRemoveManualRow = (index: number) => {
    setManualMembers((prev) => prev.filter((_, idx) => idx !== index));
    setMemberError(null);
  };

  const handleManualMemberChange = (
    index: number,
    field: "name" | "phone",
    val: string,
  ) => {
    setManualMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
    setMemberError(null);
  };

  // Final submit handler on Step 3
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Gather members according to inputMode
    let finalMembers: Array<{ name: string; phone?: string }> = [];

    if (inputMode === "batch") {
      finalMembers = parseBatchNames(batchText);
    } else {
      finalMembers = manualMembers
        .map((m) => ({ name: m.name.trim(), phone: m.phone.trim() }))
        .filter((m) => m.name.length > 0);
    }

    // 2. Validate member count (minimum 2 members)
    if (finalMembers.length < 2) {
      setMemberError("Jumlah peserta arisan minimal harus ada 2 orang ya, Bu!");
      return;
    }

    // 3. Read current values
    const current = getValues();

    // Double check step 1 & 2 values have basics
    if (!current.name || current.name.trim().length < 3) {
      setStep(1);
      return;
    }
    if (!current.manager || current.manager.trim().length < 2) {
      setStep(1);
      return;
    }
    if (!current.dues || current.dues < 1000) {
      setStep(2);
      return;
    }

    // 4. Create arisan group
    createGroup({
      name: current.name.trim(),
      manager: current.manager.trim(),
      dues: current.dues,
      wages: current.wages || 0,
      winnersCount: current.winnersCount || 1,
      periodType: current.periodType || "bulanan",
      members: finalMembers,
    });

    // 5. Reset & close
    reset();
    setStep(1);
    setMemberError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AppLogo size={36} animate className="flex-shrink-0" />
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Buat Arisan Baru
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                {step === 1 && "Langkah 1: Info Kelompok"}
                {step === 2 && "Langkah 2: Nominal & Jadwal"}
                {step === 3 && "Langkah 3: Tambah Peserta"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
            aria-label="Tutup modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Interactive Stepper Tabs */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-xs">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 font-bold transition text-[11px] ${
              step === 1
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
            }`}>
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">1. Info</span>
          </button>

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={async () => {
              const isStep1Valid = await trigger(["name", "manager"]);
              if (isStep1Valid) setStep(2);
            }}
            className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 font-bold transition text-[11px] ${
              step === 2
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
            }`}>
            <Coins className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">2. Iuran</span>
          </button>

          {/* Step 3 Pill */}
          <button
            type="button"
            onClick={async () => {
              const isStep1Valid = await trigger(["name", "manager"]);
              if (!isStep1Valid) {
                setStep(1);
                return;
              }
              const isStep2Valid = await trigger([
                "dues",
                "wages",
                "winnersCount",
                "periodType",
              ]);
              if (isStep2Valid) {
                setStep(3);
              }
            }}
            className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 font-bold transition text-[11px] ${
              step === 3
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
            }`}>
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">3. Peserta</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form
          onSubmit={handleFinalSubmit}
          className="p-5 overflow-y-auto flex-1 flex flex-col justify-between">
          {/* STEP 1: INFORMASI ARISAN (Persistent DOM - hidden when inactive) */}
          <div
            className={
              step === 1 ? "space-y-4 text-left animate-fadeIn" : "hidden"
            }>
            <div>
              <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base mb-1 flex items-center gap-1.5">
                <span>Informasi Kelompok Arisan</span>
                <span className="text-emerald-600">📝</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Beri nama kelompok arisan dan nama Ibu pengelola / bendahara.
              </p>
            </div>

            {/* Nama Arisan */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nama Kelompok Arisan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Arisan Rahat RT 05"
                {...register("name")}
                className={`w-full px-4 py-3 text-sm rounded-2xl transition-all focus:outline-none font-medium ${
                  errors.name
                    ? "border-2 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-400"
                    : "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                }`}
              />
              {errors.name && (
                <div className="text-xs text-rose-500 font-semibold flex items-center gap-1.5 mt-1 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.name.message}</span>
                </div>
              )}
            </div>

            {/* Nama Pengelola */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nama Ibu Pengelola / Bendahara{" "}
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Ibu Nilma"
                {...register("manager")}
                className={`w-full px-4 py-3 text-sm rounded-2xl transition-all focus:outline-none font-medium ${
                  errors.manager
                    ? "border-2 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-400"
                    : "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                }`}
              />
              {errors.manager && (
                <div className="text-xs text-rose-500 font-semibold flex items-center gap-1.5 mt-1 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.manager.message}</span>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
              💡 <strong>Tips:</strong> Data nama ini akan otomatis dicantumkan
              pada format pesan pengingat tagihan WhatsApp untuk para anggota.
            </div>
          </div>

          {/* STEP 2: NOMINAL & JADWAL (Persistent DOM - hidden when inactive) */}
          <div
            className={
              step === 2 ? "space-y-4 text-left animate-fadeIn" : "hidden"
            }>
            <div>
              <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base mb-1 flex items-center gap-1.5">
                <span>Nominal Iuran & Jadwal</span>
                <span className="text-emerald-600">💰</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur besaran iuran per peserta dan putaran arisan.
              </p>
            </div>

            {/* Iuran Arisan with RupiahInput */}
            <Controller
              name="dues"
              control={control}
              render={({ field }) => (
                <RupiahInput
                  label="Besar Iuran per Orang"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.dues}
                  errorMessage={errors.dues?.message}
                  placeholder="100.000"
                  helperText="Setiap anggota akan membayar nominal ini di setiap putaran."
                />
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              {/* Pemenang per Undian with CustomSelect */}
              <Controller
                name="winnersCount"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Pemenang per Undian"
                    value={field.value}
                    onChange={field.onChange}
                    options={winnerOptions}
                    error={!!errors.winnersCount}
                    errorMessage={errors.winnersCount?.message}
                  />
                )}
              />

              {/* Periode Putaran with CustomSelect */}
              <Controller
                name="periodType"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Periode Putaran"
                    value={field.value}
                    onChange={field.onChange}
                    options={periodOptions}
                    error={!!errors.periodType}
                    errorMessage={errors.periodType?.message}
                  />
                )}
              />
            </div>

            {/* Uang Kas / Upah Pengelola with RupiahInput */}
            <Controller
              name="wages"
              control={control}
              render={({ field }) => (
                <RupiahInput
                  label="Uang Kas / Upah Pengelola per Undian"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.wages}
                  errorMessage={errors.wages?.message}
                  placeholder="0"
                  helperText="Opsional: dipotong dari total uang iuran sebelum diserahkan ke pemenang."
                />
              )}
            />
          </div>

          {/* STEP 3: DAFTAR PESERTA / ADD MEMBER (Persistent DOM - hidden when inactive) */}
          <div
            className={
              step === 3 ? "space-y-4 text-left animate-fadeIn" : "hidden"
            }>
            <div>
              <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base mb-1 flex items-center gap-1.5">
                <span>Daftar Peserta Arisan</span>
                <span className="text-emerald-600">👥</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paling mudah: tempel daftar nama dari chat WhatsApp, atau ketik
                satu per satu.
              </p>
            </div>

            {/* Mode Selector Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setInputMode("batch");
                  setMemberError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition ${
                  inputMode === "batch"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}>
                <ClipboardList className="w-3.5 h-3.5" />
                Tempel dari WA (Cepat)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputMode("manual");
                  setMemberError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition ${
                  inputMode === "manual"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}>
                <UserPlus className="w-3.5 h-3.5" />
                Ketik Satu-Satu
              </button>
            </div>

            {/* Mode 1: Batch Paste from WhatsApp */}
            {inputMode === "batch" && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Tempel teks daftar nama peserta (1 nama per baris):
                </label>
                <textarea
                  rows={5}
                  value={batchText}
                  onChange={(e) => {
                    setBatchText(e.target.value);
                    setMemberError(null);
                  }}
                  placeholder="1. Ibu Siti Aminah&#10;2. Ibu Nurul Hidayah&#10;3. Ibu Dewi Sartika"
                  className={`w-full px-4 py-3 text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border focus:outline-none font-mono ${
                    memberError
                      ? "border-2 border-rose-500 bg-rose-50/50"
                      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500"
                  }`}
                />
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>
                    Terdeteksi:{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {parseBatchNames(batchText).length} orang
                    </strong>
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Otomatis buang nomor 1., 2), dsb.
                  </span>
                </div>
              </div>
            )}

            {/* Mode 2: Manual Row by Row Input */}
            {inputMode === "manual" && (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {manualMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 text-xs font-bold text-slate-400 text-right flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      placeholder="Nama Peserta (cth: Ibu Ani)"
                      value={member.name}
                      onChange={(e) =>
                        handleManualMemberChange(idx, "name", e.target.value)
                      }
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                    />
                    <input
                      type="tel"
                      placeholder="No WA (opsional)"
                      value={member.phone}
                      onChange={(e) =>
                        handleManualMemberChange(idx, "phone", e.target.value)
                      }
                      className="w-28 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {manualMembers.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveManualRow(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                        title="Hapus baris">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddManualRow}
                  className="w-full py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition">
                  <Plus className="w-4 h-4" />
                  Tambah Baris Anggota
                </button>
              </div>
            )}

            {/* Inline Member Error Message */}
            {memberError && (
              <div className="text-xs text-rose-500 font-semibold flex items-center gap-1.5 mt-1 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{memberError}</span>
              </div>
            )}
          </div>

          {/* Modal Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-4">
            {step === 1 && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition ml-auto">
                  Lanjut ke Iuran
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition ml-auto">
                  Lanjut ke Peserta
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMemberError(null);
                    setStep(2);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition active:scale-98 ml-auto">
                  <CheckCircle2 className="w-4 h-4" />
                  Simpan & Mulai Arisan
                </button>
              </>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
