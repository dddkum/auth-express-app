import create from "zustand";
import {persist} from "zustand/middleware";

type AuthStore = {
    token: string;
    isAuthorized: boolean;
    setToken: (token: string) => void;
    setIsAuthorized: (isAuthorized: boolean) => void;
    reset: () => void;
};

export const useAuthStore = create<AuthStore>(persist(
    (set) => ({
        token: "",
        isAuthorized: false,
        setToken: (token: string) => set({token}),
        setIsAuthorized: (isAuthorized: boolean) => set({isAuthorized}),
        reset: () => set({
            token: "",
            isAuthorized: false,
        }),
    }),
    {
        name: 'token',
    }
));
