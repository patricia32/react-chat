import { create } from "zustand";

type AppStore = {
  selectedField: string;
  setSelectedField: (selectedField: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  selectedField: "",
  setSelectedField: (selectedField) => set({ selectedField: selectedField }),
}));
