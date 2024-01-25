import {login, register} from "../../services/auth_service";

export const submitLogin = async (e, email, password) => {
    e.preventDefault()
    await login(email, password)
}

export const submitRegister = async (e, email, password) => {
    e.preventDefault()
    await register(email, password)
}