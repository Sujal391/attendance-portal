import { create } from 'zustand';
import type { AttendanceRecord, MonthlyAttendanceReport } from '@/lib/types';

interface AttendanceState {
  currentReport: MonthlyAttendanceReport | null;
  selectedRecord: AttendanceRecord | null;
  setCurrentReport: (report: MonthlyAttendanceReport | null) => void;
  setSelectedRecord: (record: AttendanceRecord | null) => void;
  clearAttendance: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  currentReport: null,
  selectedRecord: null,

  setCurrentReport: (report) => set({ currentReport: report }),

  setSelectedRecord: (record) => set({ selectedRecord: record }),

  clearAttendance: () =>
    set({
      currentReport: null,
      selectedRecord: null,
    }),
}));

export default useAttendanceStore;