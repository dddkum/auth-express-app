import create from "zustand";
import {persist} from "zustand/middleware";

type AuthStore = {
    token: string;
    isAuthorized: boolean;
    user: object;
    setToken: (token: string) => void;
    setIsAuthorized: (isAuthorized: boolean) => void;
    setUser: (user: object) => void;
    reset: () => void;
};

export const useAuthStore = create<AuthStore>(persist(
    (set) => ({
        token: "",
        isAuthorized: false,
        user: null,
        setToken: (token: string) => set({token}),
        setIsAuthorized: (isAuthorized: boolean) => set({isAuthorized}),
        setUser: (user: object) => set({user}),
        reset: () => set({
            token: "",
            user: null
        }),
    }),
    {
        name: 'token',
    }
));
