import { create } from "zustand";
import type { patientsType } from "../types/patientsType"

interface PatientState {
  allPatients : patientsType[];
  searchedPatients: patientsType[];
  searchDone: boolean;
  searchPage: number;  // مدیریت صفحه فعلی

  setAllPatients: (patients: patientsType[]) => void;
  setSearchedPatients: (patients: patientsType[]) => void;
  resetSearch: () => void;
  setSearchPage: (page: number) => void;  // تغییر صفحه
}

export const usePatientsStore = create<PatientState>((set) => ({
  allPatients: [],
  searchedPatients: [],
  searchDone: false,
  searchPage: 1,  // مقدار پیش‌فرض صفحه

  setAllPatients: (patients) => set({ allPatients: patients }),

  setSearchedPatients: (patients) =>
    set({ searchedPatients: patients, searchDone: true }),

  resetSearch: () =>
    set({ searchedPatients: [], searchDone: false, searchPage: 1 }), // ریست کل جستجو

  setSearchPage: (page) => set({ searchPage: page }), // ست کردن شماره صفحه
}));
