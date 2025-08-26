import { create } from "zustand";
import type { ISchedule } from "../types/schedulesType";
import axios from "axios";

interface ScheduleStore {
  schedules: ISchedule[];
  fetchSchedules: () => Promise<void>;
  addSchedule: (newSchedule: ISchedule) => void;
  setSchedules: (schedules: ISchedule[]) => void;
  isLoading: boolean;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  isLoading: false,
  schedules: [],
  fetchSchedules: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/schedules");
      set({ schedules: res.data });
    } catch (err) {
      console.error("خطا در دریافت برنامه‌ها:", err);
    } finally {
      set({ isLoading: false });
    }
  },
  addSchedule: (newSchedule) =>
    set((state) => ({ schedules: [newSchedule, ...state.schedules] })),
  setSchedules: (schedules) => set({ schedules }),
}));
