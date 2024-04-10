import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import classnames from 'classnames'
import './Navbar.scss'
import { Link } from 'react-router-dom'

import $api from '../../../app/api/api.ts'
import { useAuthStore } from '../../../app/store/auth_store.ts'
import { customToast } from '../../../shared/hooks/UseCustomToast/UseCustomToast.ts'
import { PageLoader } from '../../../shared/loaders'

export const Navbar = () => {
    const { setToken } = useAuthStore()

    const logout = useMutation<void, AxiosError<void, void> | any>({
        mutationFn() {
            return $api.post('/logout')
        },
        onSuccess() {
            setToken(null)
            customToast({
                message: 'До свидания!',
                type: 'success',
                theme: 'light',
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

    if (logout.isPending) {
        return <PageLoader />
    } else {
        return (
            <div className="Navbar">
                <div className="d-flex align-items-center h-100">
                    <Link to="/" className="navbar_tab">
                        Главная
                    </Link>
                    <Link to="/diary" className={classnames('navbar_tab')}>
                        Дневник
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
