import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useCustomToast } from '../../../shared/hooks/UseCustomToast/UseCustomToast.ts'
import { useAuthStore } from '../../../app/store/auth_store.ts'
import { useCurrentUserStore } from '../../../app/store/currentUser_store.ts'
import { signIn, signUp } from '../../../services/auth_service.ts'
import { ButtonLoader } from '../../../shared/loaders'
import { useState } from 'react'

interface IFormInput {
    email: string
    password: string
}
export const LoginForm = () => {
    const { setToken, setIsAuthenticated } = useAuthStore()
    const { setUser } = useCurrentUserStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()

    const [methodSelected, setMethodSelected] = useState('')

    const loginMutation = useMutation({
        mutationFn: (data: IFormInput) => signIn(data),
        onSuccess: response => {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            useCustomToast({
                message: response.data.message,
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

    const registerMutation = useMutation({
        mutationFn: (data: IFormInput) => signUp(data),
        onSuccess: response => {
            useCustomToast({
                message: response.data.message,
                type: 'success',
            })
        },
        onError: error => {
            useCustomToast({
                message: error.response.data.message,
                type: 'error',
            })
        },
    })

    const handleSubmitAuthForm: SubmitHandler<IFormInput> = data => {
        methodSelected === 'signUp'
            ? registerMutation.mutate(data)
            : loginMutation.mutate(data)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleSubmitAuthForm)}
                className="d-flex flex-column w-50"
            >
                <label htmlFor="email">Email</label>
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
                <span className="text-danger">{errors.email?.message}</span>

                <label htmlFor="password" className="mt-3">
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
                <span className="text-danger">{errors.password?.message}</span>

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
                    className="btn btn-warning mt-2"
                    onClick={() => setMethodSelected('signUp')}
                >
                    Зарегистрироваться
                </button>
            </form>
        </>
    )
}
