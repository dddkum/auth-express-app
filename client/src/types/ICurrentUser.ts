import {IUser} from "./IUser";

export type CurrentUserStore = {
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    isUser: boolean;
    setIsUser: (isUser: boolean) => void;
    user: object;
    setUser: (user: IUser) => void;
    reset: () => void;
};