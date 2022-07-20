import { atomWithStorage } from "jotai/utils";
import { SettingsFormValues } from "./types";

export const settingsAtom = atomWithStorage<SettingsFormValues>("settings", {
  slippage: "0.1",
  deadline: "30",
});
