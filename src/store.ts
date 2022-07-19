import { atom } from "jotai";
import { SettingsFormValues } from "./types";

const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
  const getInitialValue = () => {
    const item =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;

    if (item !== null) {
      return JSON.parse(item) as T;
    }

    return initialValue;
  };

  const baseAtom = atom(getInitialValue());

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, nextValue: T) => {
      set(baseAtom, nextValue);
      typeof window !== "undefined" &&
        localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
};

export const settingsAtom = atomWithLocalStorage<SettingsFormValues>(
  "settings",
  {
    slippage: "0.1",
    deadline: "30",
  }
);
