import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  ArisanAppState,
  ArisanGroup,
  ArisanMember,
  ArisanActivityLog,
  ArisanRound,
} from "../types/arisan";
import { sound } from "../utils/sound";

interface ArisanContextType {
  state: ArisanAppState;
  activeGroup: ArisanGroup | null;
  createGroup: (data: {
    name: string;
    manager: string;
    wages: number;
    dues: number;
    winnersCount: number;
    periodType: "mingguan" | "bulanan" | "harian";
    members: Array<{ name: string; phone?: string }>;
  }) => void;
  updateGroup: (group: ArisanGroup) => void;
  deleteGroup: (groupId: string) => void;
  setActiveGroupId: (id: string) => void;
  setRound: (roundNumber: number) => void;
  togglePayment: (memberId: number, roundNumber?: number) => void;
  markAllPaid: (paid: boolean, roundNumber?: number) => void;
  drawLottery: (roundNumber?: number) => ArisanMember[];
  resetCurrentRoundLottery: (roundNumber?: number) => void;
  addMember: (member: { name: string; phone?: string }) => void;
  removeMember: (memberId: number) => void;
  toggleTheme: () => void;
  exportBackup: () => void;
  importBackup: (jsonContent: string) => { success: boolean; message: string };
  resetAllData: () => void;
  loadSampleData: () => void;
}

const STORAGE_KEY = "arisanbae_v2_storage";

// Optional demo group if user wants to test
const DEMO_SAMPLE_GROUP: ArisanGroup = {
  id: "demo-arisan-rt05",
  name: "Arisan Rahat RT 05",
  administrator: {
    manager: "Ibu Nilma",
    wages: 50000,
  },
  dues: 100000,
  winnersCount: 1,
  periodType: "bulanan",
  periodInterval: 1,
  createdAt: new Date().toISOString(),
  currentRound: 1,
  members: [
    { id: 1, name: "Ibu Siti Aminah", phone: "081234567890", hasWon: false },
    { id: 2, name: "Ibu Nurul Hidayah", phone: "081234567891", hasWon: false },
    { id: 3, name: "Ibu Dewi Sartika", phone: "081234567892", hasWon: false },
    { id: 4, name: "Ibu Fatimah Zahra", phone: "081234567893", hasWon: false },
    { id: 5, name: "Ibu Sri Wahyuni", phone: "081234567894", hasWon: false },
    { id: 6, name: "Ibu Linda Marlina", phone: "081234567895", hasWon: false },
  ],
  rounds: {
    1: {
      roundNumber: 1,
      isDrawn: false,
      winnerIds: [],
      payments: { 1: true, 2: true, 3: false, 4: true, 5: false, 6: false },
    },
    2: { roundNumber: 2, isDrawn: false, winnerIds: [], payments: {} },
    3: { roundNumber: 3, isDrawn: false, winnerIds: [], payments: {} },
    4: { roundNumber: 4, isDrawn: false, winnerIds: [], payments: {} },
    5: { roundNumber: 5, isDrawn: false, winnerIds: [], payments: {} },
    6: { roundNumber: 6, isDrawn: false, winnerIds: [], payments: {} },
  },
};

// Default state is cleanly empty (No pre-filled arisan melati)
const DEFAULT_STATE: ArisanAppState = {
  groups: [],
  activeGroupId: null,
  activityLogs: [],
  theme: "light",
};

const ArisanContext = createContext<ArisanContextType | undefined>(undefined);

export const ArisanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ArisanAppState>(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse saved state:", e);
    }
    return DEFAULT_STATE;
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }, [state]);

  // Apply dark mode class to html document
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  // Active Group helper
  const activeGroup = useMemo(() => {
    if (!state.activeGroupId) return state.groups[0] || null;
    return (
      state.groups.find((g) => g.id === state.activeGroupId) ||
      state.groups[0] ||
      null
    );
  }, [state.groups, state.activeGroupId]);

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const createGroup = (data: {
    name: string;
    manager: string;
    wages: number;
    dues: number;
    winnersCount: number;
    periodType: "mingguan" | "bulanan" | "harian";
    members: Array<{ name: string; phone?: string }>;
  }) => {
    const groupId = "group-" + Date.now();
    const members: ArisanMember[] = data.members.map((m, idx) => ({
      id: idx + 1,
      name: m.name.trim(),
      phone: m.phone ? m.phone.trim() : "",
      hasWon: false,
    }));

    const totalRounds = Math.max(
      1,
      Math.ceil(members.length / Math.max(1, data.winnersCount)),
    );
    const rounds: Record<number, ArisanRound> = {};

    for (let i = 1; i <= totalRounds; i++) {
      rounds[i] = {
        roundNumber: i,
        isDrawn: false,
        winnerIds: [],
        payments: {},
      };
    }

    const newGroup: ArisanGroup = {
      id: groupId,
      name: data.name.trim(),
      administrator: {
        manager: data.manager.trim() || "Ibu Bendahara",
        wages: data.wages || 0,
      },
      dues: data.dues,
      winnersCount: data.winnersCount || 1,
      periodType: data.periodType,
      periodInterval: 1,
      createdAt: new Date().toISOString(),
      currentRound: 1,
      members,
      rounds,
    };

    const newLog: ArisanActivityLog = {
      id: "log-" + Date.now(),
      groupId,
      text: `Grup arisan "${newGroup.name}" berhasil dibuat oleh ${newGroup.administrator.manager}.`,
      type: "create",
      timestamp: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      groups: [newGroup, ...prev.groups],
      activeGroupId: groupId,
      activityLogs: [newLog, ...prev.activityLogs],
    }));
  };

  const updateGroup = (updatedGroup: ArisanGroup) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
    }));
  };

  const deleteGroup = (groupId: string) => {
    setState((prev) => {
      const remaining = prev.groups.filter((g) => g.id !== groupId);
      return {
        ...prev,
        groups: remaining,
        activeGroupId: remaining.length > 0 ? remaining[0].id : null,
      };
    });
  };

  const setActiveGroupId = (id: string) => {
    setState((prev) => ({ ...prev, activeGroupId: id }));
  };

  const setRound = (roundNumber: number) => {
    if (!activeGroup) return;
    updateGroup({
      ...activeGroup,
      currentRound: roundNumber,
    });
  };

  const togglePayment = (memberId: number, targetRound?: number) => {
    if (!activeGroup) return;
    const rNum = targetRound ?? activeGroup.currentRound;
    const round = activeGroup.rounds[rNum] || {
      roundNumber: rNum,
      isDrawn: false,
      winnerIds: [],
      payments: {},
    };

    const currentStatus = !!round.payments[memberId];
    const newStatus = !currentStatus;

    sound.playPop();

    const member = activeGroup.members.find((m) => m.id === memberId);
    const memberName = member ? member.name : `Anggota #${memberId}`;

    const newLog: ArisanActivityLog = {
      id: "log-" + Date.now(),
      groupId: activeGroup.id,
      text: newStatus
        ? `${memberName} melunasi iuran Putaran ${rNum}.`
        : `Status lunas ${memberName} dibatalkan di Putaran ${rNum}.`,
      type: "payment",
      timestamp: new Date().toISOString(),
    };

    const updatedGroup: ArisanGroup = {
      ...activeGroup,
      rounds: {
        ...activeGroup.rounds,
        [rNum]: {
          ...round,
          payments: {
            ...round.payments,
            [memberId]: newStatus,
          },
        },
      },
    };

    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
      activityLogs: [newLog, ...prev.activityLogs],
    }));
  };

  const markAllPaid = (paid: boolean, targetRound?: number) => {
    if (!activeGroup) return;
    const rNum = targetRound ?? activeGroup.currentRound;
    const round = activeGroup.rounds[rNum] || {
      roundNumber: rNum,
      isDrawn: false,
      winnerIds: [],
      payments: {},
    };

    const updatedPayments: Record<number, boolean> = {};
    activeGroup.members.forEach((m) => {
      updatedPayments[m.id] = paid;
    });

    sound.playPop();

    const newLog: ArisanActivityLog = {
      id: "log-" + Date.now(),
      groupId: activeGroup.id,
      text: paid
        ? `Semua anggota (${activeGroup.members.length} orang) ditandai lunas untuk Putaran ${rNum}.`
        : `Status iuran semua anggota direset ke belum bayar untuk Putaran ${rNum}.`,
      type: "payment",
      timestamp: new Date().toISOString(),
    };

    const updatedGroup: ArisanGroup = {
      ...activeGroup,
      rounds: {
        ...activeGroup.rounds,
        [rNum]: {
          ...round,
          payments: updatedPayments,
        },
      },
    };

    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
      activityLogs: [newLog, ...prev.activityLogs],
    }));
  };

  const drawLottery = (targetRound?: number): ArisanMember[] => {
    if (!activeGroup) return [];
    const rNum = targetRound ?? activeGroup.currentRound;
    const round = activeGroup.rounds[rNum];
    if (!round) return [];

    // Eligible members: not yet won
    const eligibleMembers = activeGroup.members.filter((m) => !m.hasWon);
    if (eligibleMembers.length === 0) return [];

    // Shuffle and pick
    const countToPick = Math.min(
      activeGroup.winnersCount,
      eligibleMembers.length,
    );
    const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
    const pickedWinners = shuffled.slice(0, countToPick);
    const pickedWinnerIds = pickedWinners.map((w) => w.id);

    sound.playWinnerFanfare();

    // Update members
    const updatedMembers = activeGroup.members.map((m) => {
      if (pickedWinnerIds.includes(m.id)) {
        return { ...m, hasWon: true, wonInRound: rNum };
      }
      return m;
    });

    const updatedGroup: ArisanGroup = {
      ...activeGroup,
      members: updatedMembers,
      rounds: {
        ...activeGroup.rounds,
        [rNum]: {
          ...round,
          isDrawn: true,
          drawnAt: new Date().toISOString(),
          winnerIds: pickedWinnerIds,
        },
      },
    };

    const winnerNames = pickedWinners.map((w) => w.name).join(", ");
    const newLog: ArisanActivityLog = {
      id: "log-" + Date.now(),
      groupId: activeGroup.id,
      text: `🎉 Putaran ${rNum} diundi! Selamat kepada: ${winnerNames}`,
      type: "lottery",
      timestamp: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
      activityLogs: [newLog, ...prev.activityLogs],
    }));

    return pickedWinners;
  };

  const resetCurrentRoundLottery = (targetRound?: number) => {
    if (!activeGroup) return;
    const rNum = targetRound ?? activeGroup.currentRound;
    const round = activeGroup.rounds[rNum];
    if (!round || !round.isDrawn) return;

    const roundWinnerIds = round.winnerIds || [];

    const updatedMembers = activeGroup.members.map((m) => {
      if (roundWinnerIds.includes(m.id)) {
        return { ...m, hasWon: false, wonInRound: undefined };
      }
      return m;
    });

    const updatedGroup: ArisanGroup = {
      ...activeGroup,
      members: updatedMembers,
      rounds: {
        ...activeGroup.rounds,
        [rNum]: {
          ...round,
          isDrawn: false,
          drawnAt: undefined,
          winnerIds: [],
        },
      },
    };

    const newLog: ArisanActivityLog = {
      id: "log-" + Date.now(),
      groupId: activeGroup.id,
      text: `Hasil undian Putaran ${rNum} telah direset ulang.`,
      type: "system",
      timestamp: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
      activityLogs: [newLog, ...prev.activityLogs],
    }));
  };

  const addMember = (newMember: { name: string; phone?: string }) => {
    if (!activeGroup) return;
    const nextId =
      activeGroup.members.reduce((max, m) => Math.max(max, m.id), 0) + 1;

    const memberObj: ArisanMember = {
      id: nextId,
      name: newMember.name.trim(),
      phone: newMember.phone ? newMember.phone.trim() : "",
      hasWon: false,
    };

    const updatedMembers = [...activeGroup.members, memberObj];
    const totalRounds = Math.max(
      1,
      Math.ceil(updatedMembers.length / activeGroup.winnersCount),
    );
    const updatedRounds = { ...activeGroup.rounds };
    for (let i = 1; i <= totalRounds; i++) {
      if (!updatedRounds[i]) {
        updatedRounds[i] = {
          roundNumber: i,
          isDrawn: false,
          winnerIds: [],
          payments: {},
        };
      }
    }

    const updatedGroup: ArisanGroup = {
      ...activeGroup,
      members: updatedMembers,
      rounds: updatedRounds,
    };

    updateGroup(updatedGroup);
  };

  const removeMember = (memberId: number) => {
    if (!activeGroup) return;
    const updatedMembers = activeGroup.members.filter((m) => m.id !== memberId);
    updateGroup({
      ...activeGroup,
      members: updatedMembers,
    });
  };

  const exportBackup = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = `arisanbae_cadangan_${new Date().toISOString().slice(0, 10)}.json`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importBackup = (
    jsonContent: string,
  ): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonContent);

      // Check if it's v2 format
      if (parsed && Array.isArray(parsed.groups)) {
        setState(parsed);
        return { success: true, message: "Data arisan berhasil dipulihkan!" };
      }

      // Check if it's v1 legacy format (has `arisan` object)
      const legacyArisan = parsed.arisan || parsed;
      if (
        legacyArisan &&
        legacyArisan.name &&
        Array.isArray(legacyArisan.members)
      ) {
        const convertedMembers: ArisanMember[] = legacyArisan.members.map(
          (m: any, idx: number) => ({
            id: m.id || idx + 1,
            name: m.name,
            phone: m.telp || m.phone || "",
            hasWon: !!m.winner,
            wonInRound: m.winner_ke,
          }),
        );

        const convertedRounds: Record<number, ArisanRound> = {};
        if (legacyArisan.schedule) {
          Object.entries(legacyArisan.schedule).forEach(
            ([rNumStr, scheduleList]: [string, any]) => {
              const rNum = parseInt(rNumStr, 10);
              const payments: Record<number, boolean> = {};
              const winners: number[] = [];
              if (Array.isArray(scheduleList)) {
                scheduleList.forEach((s: any) => {
                  payments[s.id] = !!s.paid;
                  if (s.winner) winners.push(s.id);
                });
              }
              convertedRounds[rNum] = {
                roundNumber: rNum,
                isDrawn: winners.length > 0,
                winnerIds: winners,
                payments,
              };
            },
          );
        }

        const newGroup: ArisanGroup = {
          id: "imported-" + Date.now(),
          name: legacyArisan.name,
          administrator: {
            manager: legacyArisan.administrator?.manager || "Ibu Pengelola",
            wages: legacyArisan.administrator?.wages || 0,
          },
          dues: legacyArisan.dues || 100000,
          winnersCount: parseInt(legacyArisan.winners_count, 10) || 1,
          periodType: "bulanan",
          periodInterval: 1,
          createdAt: new Date().toISOString(),
          currentRound: legacyArisan.arisan_ke || 1,
          members: convertedMembers,
          rounds: convertedRounds,
        };

        setState((prev) => ({
          ...prev,
          groups: [newGroup, ...prev.groups],
          activeGroupId: newGroup.id,
          activityLogs: [
            {
              id: "log-" + Date.now(),
              groupId: newGroup.id,
              text: `Data Arisan "${newGroup.name}" berhasil diimpor dari versi lama.`,
              type: "system",
              timestamp: new Date().toISOString(),
            },
            ...prev.activityLogs,
          ],
        }));

        return {
          success: true,
          message: `Arisan "${newGroup.name}" berhasil diimpor!`,
        };
      }

      return { success: false, message: "Format file JSON tidak dikenali." };
    } catch (e: any) {
      return { success: false, message: "Gagal membaca file: " + e.message };
    }
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(DEFAULT_STATE);
  };

  const loadSampleData = () => {
    setState({
      groups: [DEMO_SAMPLE_GROUP],
      activeGroupId: DEMO_SAMPLE_GROUP.id,
      activityLogs: [
        {
          id: "log-sample-1",
          groupId: DEMO_SAMPLE_GROUP.id,
          text: "Grup demo Arisan Rahat RT 05 dimuat.",
          type: "create",
          timestamp: new Date().toISOString(),
        },
      ],
      theme: "light",
    });
  };

  return (
    <ArisanContext.Provider
      value={{
        state,
        activeGroup,
        createGroup,
        updateGroup,
        deleteGroup,
        setActiveGroupId,
        setRound,
        togglePayment,
        markAllPaid,
        drawLottery,
        resetCurrentRoundLottery,
        addMember,
        removeMember,
        toggleTheme,
        exportBackup,
        importBackup,
        resetAllData,
        loadSampleData,
      }}>
      {children}
    </ArisanContext.Provider>
  );
};

export const useArisan = () => {
  const context = useContext(ArisanContext);
  if (!context) {
    throw new Error("useArisan must be used within an ArisanProvider");
  }
  return context;
};
