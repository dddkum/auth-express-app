import {create} from "zustand";
import {IUser} from "../models/IUser";

type CurrentUserStore = {
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    isUser: boolean;
    setIsUser: (isUser: boolean) => void;
    user: object;
    setUser: (user: IUser) => void;
    reset: () => void;
};

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
