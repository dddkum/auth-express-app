import { IUser } from './IUser.ts'

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface IAuthData {
    email: string
    password: string
}
