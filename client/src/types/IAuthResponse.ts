import { IUser } from './IUser'

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface ILoginData {
    email: string
    password: string
}
