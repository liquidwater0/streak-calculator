import { create } from "zustand";

interface MenuStore {
    settings: boolean,
    manageTimers: boolean,
    openMenu: (menu: string) => void,
    closeAllMenus: () => void
}

export const useMenus = create<MenuStore>(set => ({
    settings: false,
    manageTimers: false,
    openMenu: (menu: string) => set(state => {
        return Object.fromEntries(
            Object.entries(state).map(([key, value]) => {
                const isBoolean = typeof value === "boolean";
                const isMenu = key === menu;

                if (isBoolean && isMenu) {
                    return [ key, true ];
                }

                if (isBoolean && !isMenu) {
                    return [ key, false ];
                }

                return [ key, value ];
            })
        );
    }),
    closeAllMenus: () => set(state => {
        return Object.fromEntries(
            Object.entries(state).map(([key, value]) => [
                key,
                typeof value === "boolean" ? false : value
            ])
        );
    })
}));