import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import $api from '@/app/api/api.ts'
import { useAuthStore } from '@/app/store/auth_store.ts'
import { useCurrentUserStore } from '@/app/store/currentUser_store.ts'
import { customToast } from '@/shared/hooks/UseCustomToast/UseCustomToast.ts'
import { ButtonLoader } from '@/shared/loaders'
import {
    FieldError,
    FieldErrors,
    SubmitHandler,
    useForm,
} from 'react-hook-form'

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
        AxiosError<void, void> | any
    >({
        mutationFn(data) {
            return $api.post('/login', data)
        },
        onSuccess(response) {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            customToast({
                message: 'Вы вошли в свой профиль',
                type: 'success',
                theme: 'dark',
            })
        },
        onError: error => {
            customToast({
                message: error.response.data.message,
                type: 'error',
                theme: 'dark',
            })
            setIsAuthenticated(false)
        },
    })

    const registerMutation = useMutation<
        AxiosResponse,
        AxiosError<void, void> | any
    >({
        mutationFn(data) {
            return $api.post('/registration', data)
        },
        onSuccess(response) {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            customToast({
                message:
                    'Вы успешно зарегистрировались и будете перенаправлены в свой профиль',
                type: 'success',
                theme: 'dark',
            })
        },
        onError(error) {
            customToast({
                message: error.response.data.message,
                type: 'error',
                theme: 'light',
            })
        },
    })

    const handleValidationError = (errors: FieldErrors<FieldError>) => {
        for (const [_, error] of Object.entries(errors)) {
            customToast({
                message: (error.message ?? error) as string,
                type: 'error',
                theme: 'dark',
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
                <label
                    htmlFor="email"
                    className="text-black fw-medium text-body-tertiary"
                >
                    Email
                </label>
                <input
                    className="fw-medium"
                    placeholder="example@email.com"
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

                <label
                    htmlFor="password"
                    className="mt-3 text-black fw-medium text-body-tertiary"
                >
                    Пароль
                </label>
                <input
                    className="fw-medium"
                    type="password"
                    placeholder="******"
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
                    className="btn btn-outline-dark mt-5 d-flex align-items-center justify-content-center fw-bold"
                    disabled={loginMutation.isPending}
                    onClick={() => setMethodSelected('signIn')}
                >
                    <ButtonLoader loading={loginMutation.isPending} size={24} />
                    {!loginMutation.isPending && 'Вход'}
                </button>
                <button
                    type="submit"
                    className="btn btn-dark mt-2 text-center text-break fw-bold"
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
