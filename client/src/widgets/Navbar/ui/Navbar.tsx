import classnames from 'classnames'
import styles from './Navbar.module.scss'
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
            <div className={styles.Navbar}>
                <div>
                    <Link
                        to="/"
                        className={classnames(
                            styles.navbar_tab,
                            'btn',
                            'btn-outline-light'
                        )}
                    >
                        Главная страница
                    </Link>
                    <Link
                        to="/gallery"
                        className={classnames(
                            styles.navbar_tab,
                            'btn',
                            'btn-outline-light'
                        )}
                    >
                        Галерея
                    </Link>
                </div>
                <div>
                    <button
                        className={classnames(
                            styles.navbar_tab,
                            'btn',
                            'btn-outline-light'
                        )}
                        onClick={() => logout.mutate()}
                    >
                        Выход
                    </button>
                </div>
            </div>
        )
    }
}
