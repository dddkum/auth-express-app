import create from "zustand";
import { persist } from "zustand/middleware";

type TokenStore = {
    token: string;
    setToken: (token: string) => void;
    reset: () => void;
};

export const useTokenStore = create<TokenStore>(persist(
    (set) => ({
        token: "",
        setToken: (token: string) => set({ token }),
        reset: () => set({ token: "" }),
    }),
    {
        name: 'token',
    }
));
