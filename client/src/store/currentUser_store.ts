import {create} from "zustand";
import {IUser} from "../types/IUser";
import {CurrentUserStore} from "../types/ICurrentUser";

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
    isAdmin: false,
    setIsAdmin: (isAdmin: boolean) => set({isAdmin}),
    isUser: false,
    setIsUser: (isUser: boolean) => set({isUser}),
    user: {},
    setUser: (user: IUser) => set({user}),
    reset: () =>
        set({
            isAdmin: false,
            isUser: false,
            user: {},
        }),
}));
