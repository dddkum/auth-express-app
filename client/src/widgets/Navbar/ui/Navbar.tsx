import classnames from 'classnames'
import './Navbar.scss'
import { useMutation } from '@tanstack/react-query'
import $api from '../../../app/api/api.ts'
import { useAuthStore } from '../../../app/store/auth_store.ts'
import { useCustomToast } from '../../../shared/hooks/UseCustomToast/UseCustomToast.ts'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import { PageLoader } from '../../../shared/loaders'
export const Navbar = () => {
    const { setToken } = useAuthStore()

    const logout = useMutation<void, AxiosError<any, any> | any>({
        mutationFn() {
            return $api.post('/logout')
        },
        onSuccess() {
            setToken(null)
            useCustomToast({
                message: 'До свидания!',
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

    if (logout.isPending) {
        return <PageLoader loading={logout.isPending} />
    } else {
        return (
            <div className="Navbar">
                <div className="d-flex align-items-center h-100">
                    <Link to="/" className="navbar_tab">
                        Главная страница
                    </Link>
                    <Link to="/gallery" className={classnames('navbar_tab')}>
                        Галерея
                    </Link>
                </div>

                <Link
                    to="/auth"
                    className="navbar_tab"
                    onClick={() => logout.mutate()}
                >
                    Выход
                </Link>
            </div>
        )
    }
}
