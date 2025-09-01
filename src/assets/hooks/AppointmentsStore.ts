import { create } from "zustand";
import type { IAppointment } from "../types/appointmentsType";
import axios from "axios";

interface AppoitmentsStore {
  appointment: IAppointment[];
  fetchAppointment: () => Promise<void>;
  addAppointment: (newAppointment: IAppointment) => void;
  setAppointment: (appointment: IAppointment[]) => void;
  isLoading: boolean;
}

export const useAppointmentStore = create<AppoitmentsStore>((set) => ({
  isLoading: false,
  appointment: [],
  fetchAppointment: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        "https://nowruzi.top/api/Clinic/appointments"
      );
      set({ appointment: res.data });
    } catch (err) {
      console.error("خطا در دریافت نوبت ها:", err);
    } finally {
      set({ isLoading: false });
    }
  },
  addAppointment: (newAppointment) =>
    set((state) => ({ appointment: [newAppointment, ...state.appointment] })),
  setAppointment: (appointment) => set({ appointment }),
}));
