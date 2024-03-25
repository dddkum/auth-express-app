import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
    email: string
    password: string
}
function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()
    const handleSubmitForm: SubmitHandler<IFormInput> = data =>
        console.log(data)

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="d-flex flex-column w-50"
            >
                <label htmlFor="email">Email</label>
                <input
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
                <span className="text-danger">{errors.email?.message}</span>

                <label htmlFor="password" className="mt-3">
                    Пароль
                </label>
                <input
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 8,
                            message:
                                'Password must be at least 8 characters long',
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                'Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character',
                        },
                    })}
                />
                <span className="text-danger">{errors.password?.message}</span>

                <button type="submit" className="btn btn-outline-warning mt-5">
                    Вход
                </button>
                <button
                    type="button"
                    className="btn btn-warning mt-2"
                    onClick={() =>
                        console.log('register button need to configure')
                    }
                >
                    Регистрация
                </button>
            </form>
        </div>
    )
}

export default LoginForm
