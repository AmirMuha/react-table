import { atom } from "jotai";

export const AMTableAtoms = {
  selectedRow: atom<Record<string, any>>({}),
  selectedCell: atom<Record<string, any>>({}),
};
