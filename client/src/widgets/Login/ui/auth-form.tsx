import { SubmitHandler, useForm } from 'react-hook-form'
import { submitLogin } from './helpers.ts'
import { useState } from 'react'
import { ButtonLoader, PageLoader } from '../../../shared/loaders'

interface IFormInput {
    email: string
    password: string
}
export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()

    const [isLoading, setIsLoading] = useState(true)
    const handleSubmitLoginForm: SubmitHandler<IFormInput> = data =>
        submitLogin(data)

    return (
        <>
            <form
                onSubmit={handleSubmit(handleSubmitLoginForm)}
                className="d-flex flex-column w-50"
            >
                <label htmlFor="email">Email</label>
                <input
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Поле {field} обязательно!',
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
                            message: 'Поле {field} обязательно!',
                        },
                        minLength: {
                            value: 8,
                            message:
                                'Минимальная длина пароля 8 символов',
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/,
                            message:
                                'Пароль должен состоять минимум из одной заглавной, прописной букв, спец. символа и цифры',
                        },
                    })}
                />
                <span className="text-danger">{errors.password?.message}</span>

                <button type="submit" className="btn btn-outline-warning mt-5 d-flex align-items-center justify-content-center">
                    {!isLoading && 'Вход'}
                    <ButtonLoader loading={isLoading} size={25} />
                </button>
                <button
                    type="button"
                    className="btn btn-warning mt-2"
                    onClick={() =>
                        setIsLoading(!isLoading)
                    }
                >
                    Зарегистрироваться
                </button>
            </form>
            <PageLoader loading={isLoading} />
        </>
    )
}
