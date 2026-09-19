export type PaymentPeriodType = 'mingguan' | 'bulanan' | 'harian';

export interface ArisanMember {
  id: number;
  name: string;
  phone: string;
  hasWon: boolean;
  wonInRound?: number;
  notes?: string;
}

export interface RoundPaymentStatus {
  memberId: number;
  paid: boolean;
  paidAt?: string;
}

export interface ArisanRound {
  roundNumber: number;
  isDrawn: boolean;
  drawnAt?: string;
  winnerIds: number[];
  payments: Record<number, boolean>; // memberId -> isPaid
}

export interface ArisanGroup {
  id: string;
  name: string;
  administrator: {
    manager: string;
    wages: number; // kas / jasa pengelola per putaran
  };
  dues: number; // iuran per orang
  winnersCount: number; // pemenang per putaran
  periodType: PaymentPeriodType;
  periodInterval: number; // misal setiap 1 bulan / 2 minggu
  createdAt: string;
  members: ArisanMember[];
  currentRound: number;
  rounds: Record<number, ArisanRound>; // roundNumber -> round data
}

export interface ArisanActivityLog {
  id: string;
  groupId: string;
  text: string;
  type: 'payment' | 'lottery' | 'create' | 'system';
  timestamp: string;
}

export interface ArisanAppState {
  groups: ArisanGroup[];
  activeGroupId: string | null;
  activityLogs: ArisanActivityLog[];
  theme: 'light' | 'dark';
}
