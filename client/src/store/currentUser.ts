import { create } from "zustand";

type CurrentUserStore = {
    email: string;
    password: string;
    isAdmin: boolean;
    setEmail: (currentLogin: string) => void;
    setPassword: (currentPassword: string) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    reset: () => void;
};

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
    email: "",
    password: "",
    isAdmin: false,
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setIsAdmin: (isAdmin: boolean) => set({isAdmin}),
    reset: () =>
        set({
            email: "",
            password: "",
        }),
}));
