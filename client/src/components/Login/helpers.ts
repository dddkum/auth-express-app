import { login, register } from '../../services/auth_service'
import {ILoginData} from "../../types/IAuthResponse.ts";

export const submitLogin = async (data: ILoginData) => {
    await login(data)
}

export const submitRegister = async (e, email, password) => {
    e.preventDefault()
    await register(email, password)
}
