import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore } from '../types/IAuthStore.ts'

export const useAuthStore = create<AuthStore>()(
    persist(
        set => ({
            token: '',
            setToken: token => set({ token }),
            isAuthenticated: false,
            setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
            reset: () =>
                set({
                    token: '',
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'authToken',
        }
    )
)
