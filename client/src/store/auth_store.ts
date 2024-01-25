import {create} from "zustand";
import {persist} from "zustand/middleware";
import {AuthStore} from "../types/IAuthStore";

export const useAuthStore = create<AuthStore>(persist(
    (set) => ({
        token: "",
        isAuthenticated: false,
        setToken: (token: string) => set({token}),
        setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
        reset: () => set({
            token: "",
            isAuthenticated: false,
        }),
    }),
    {
        name: 'token',
    }
));