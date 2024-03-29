import {
    FieldError,
    FieldErrors,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useCustomToast } from '../../../shared/hooks/UseCustomToast/UseCustomToast.ts'
import { useAuthStore } from '../../../app/store/auth_store.ts'
import { useCurrentUserStore } from '../../../app/store/currentUser_store.ts'
import { ButtonLoader } from '../../../shared/loaders'
import { useState } from 'react'
import $api from '../../../app/api/api.ts'
import { AxiosError, AxiosResponse } from 'axios'

interface IFormInput {
    email: string
    password: string
}
export const LoginForm = () => {
    const { setToken, setIsAuthenticated } = useAuthStore()
    const { setUser } = useCurrentUserStore()
    const { register, handleSubmit } = useForm<IFormInput>()

    const [methodSelected, setMethodSelected] = useState('')

    const handleSubmitAuthForm: SubmitHandler<IFormInput> = data => {
        methodSelected === 'signUp'
            ? registerMutation.mutate(data)
            : loginMutation.mutate(data)
    }

    const loginMutation = useMutation<
        AxiosResponse,
        AxiosError<any, any> | any
    >({
        mutationFn(data) {
            return $api.post('/login', data)
        },
        onSuccess(response) {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            useCustomToast({
                message: 'Вы вошли в свой профиль',
                type: 'success',
            })
        },
        onError: error => {
            useCustomToast({
                message: error.response.data.message,
                type: 'error',
            })
            setIsAuthenticated(false)
        },
    })

    const registerMutation = useMutation<
        AxiosResponse,
        AxiosError<any, any> | any
    >({
        mutationFn(data) {
            return $api.post('/registration', data)
        },
        onSuccess(response) {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            useCustomToast({
                message:
                    'Вы успешно зарегистрировались и будете перенаправлены в свой профиль',
                type: 'success',
            })
        },
        onError(error) {
            useCustomToast({
                message: error.response.data.message,
                type: 'error',
            })
        },
    })

    const handleValidationError = (errors: FieldErrors<FieldError>) => {
        for (const [_, error] of Object.entries(errors)) {
            useCustomToast({
                message: (error.message ?? error) as string,
                type: 'error',
            })
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(
                    handleSubmitAuthForm,
                    handleValidationError
                )}
                className="d-flex flex-column w-50"
            >
                <label htmlFor="email" className="text-black fw-medium">
                    Email
                </label>
                <input
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Поле email обязательно!',
                        },
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: 'Введите корректный адрес почты',
                        },
                    })}
                />

                <label htmlFor="password" className="mt-3 text-black fw-medium">
                    Пароль
                </label>
                <input
                    type="password"
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Поле пароль обязательно!',
                        },
                        minLength: {
                            value: 6,
                            message: 'Минимальная длина пароля 6 символов',
                        },
                    })}
                />

                <button
                    type="submit"
                    className="btn btn-outline-warning mt-5 d-flex align-items-center justify-content-center"
                    disabled={loginMutation.isPending}
                    onClick={() => setMethodSelected('signIn')}
                >
                    <ButtonLoader loading={loginMutation.isPending} size={24} />
                    {!loginMutation.isPending && 'Вход'}
                </button>
                <button
                    type="submit"
                    className="btn btn-warning mt-2 d-flex align-items-center justify-content-center"
                    onClick={() => setMethodSelected('signUp')}
                >
                    <ButtonLoader
                        loading={registerMutation.isPending}
                        size={24}
                    />
                    {!registerMutation.isPending && 'Зарегистрироваться'}
                </button>
            </form>
        </>
    )
}
