import {create} from "zustand";

type CurrentUserStore = {
    isAdmin: boolean;
    isUser: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    setIsUser: (isUser: boolean) => void;
    reset: () => void;
};

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
    isAdmin: false,
    isUser: false,
    setIsAdmin: (isAdmin: boolean) => set({isAdmin}),
    setIsUser: (isUser: boolean) => set({isUser}),
    reset: () =>
        set({
            isAdmin: false
        }),
}));
