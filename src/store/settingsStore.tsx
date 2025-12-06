import { create } from "zustand";
import { 
    THEME_STORAGE_KEY,
    SHOW_TIMERS_STORAGE_KEY,
    DEFAULT_THEME, 
    DEFAULT_SHOW_TIMERS 
} from "../constants";

type ThemeType = "dark" | "light";

interface SettingsStore {
    theme: ThemeType,
    showTimers: boolean,
    setTheme: (theme: ThemeType) => void,
    toggleShowTimers: () => void
}

function storageValueToBoolean(value: string | null) {
    if (value === "true") return true;
    if (value === "false") return false;
    return null;
}

export const useSettings = create<SettingsStore>(set => ({
    theme: localStorage.getItem(THEME_STORAGE_KEY) as ThemeType || DEFAULT_THEME,
    showTimers: storageValueToBoolean(localStorage.getItem(SHOW_TIMERS_STORAGE_KEY)) ?? DEFAULT_SHOW_TIMERS,
    setTheme: (theme: ThemeType) => set(state => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        return { ...state, theme };
    }),
    toggleShowTimers: () => set(state => {
        localStorage.setItem(SHOW_TIMERS_STORAGE_KEY, !state.showTimers + "");
        return { ...state, showTimers: !state.showTimers };
    })
}));