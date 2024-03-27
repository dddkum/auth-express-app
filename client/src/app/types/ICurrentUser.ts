import { IUser } from './IUser.ts'

export type CurrentUserStore = {
    isAdmin: boolean
    setIsAdmin: (isAdmin: boolean) => void
    isUser: boolean
    setIsUser: (isUser: boolean) => void
    user: object | null
    setUser: (user: IUser) => void
    reset: () => void
}
