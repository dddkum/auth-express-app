import { login, register } from '../../../services/auth_service.ts'
import { IAuthData } from '../../../app/types/IAuthResponse.ts'

export const submitLogin = async (data: IAuthData) => {
    await login(data)
}

export const submitRegister = async (data: IAuthData) => {
    await register(data)
}
