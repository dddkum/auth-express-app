import { create } from 'zustand'
import { IUser } from '../types/IUser.ts'
import { CurrentUserStore } from '../types/ICurrentUser.ts'

export const useCurrentUserStore = create<CurrentUserStore>(set => ({
    isAdmin: false,
    setIsAdmin: isAdmin => set({ isAdmin }),
    isUser: false,
    setIsUser: isUser => set({ isUser }),
    user: null,
    setUser: (user: IUser) => set({ user }),
    reset: () =>
        set({
            isAdmin: false,
            isUser: false,
            user: null,
        }),
}))