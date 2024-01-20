import { create } from "zustand";

type CurrentUserStore = {
    email: string;
    password: string;
    setEmail: (currentLogin: string) => void;
    setPassword: (currentPassword: string) => void;
    reset: () => void;
};

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
    email: "",
    password: "",
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    reset: () =>
        set({
            email: "",
            password: "",
        }),
}));
