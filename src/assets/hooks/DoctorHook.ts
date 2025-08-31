import { create } from "zustand";
import type { IDoctor } from "../types/doctor"

interface DoctorState {
  allDoctors: IDoctor[];
  searchedDoctors: IDoctor[];
  searchDone: boolean;
  searchPage: number;  // مدیریت صفحه فعلی

  setAllDoctors: (doctors: IDoctor[]) => void;
  setSearchedDoctors: (doctors: IDoctor[]) => void;
  resetSearch: () => void;
  setSearchPage: (page: number) => void;  // تغییر صفحه
}

export const useDoctorStore = create<DoctorState>((set) => ({
  allDoctors: [],
  searchedDoctors: [],
  searchDone: false,
  searchPage: 1,  // مقدار پیش‌فرض صفحه

  setAllDoctors: (doctors) => set({ allDoctors: doctors }),

  setSearchedDoctors: (doctors) =>
    set({ searchedDoctors: doctors, searchDone: true }),

  resetSearch: () =>
    set({ searchedDoctors: [], searchDone: false, searchPage: 1 }), // ریست کل جستجو

  setSearchPage: (page) => set({ searchPage: page }), // ست کردن شماره صفحه
}));
