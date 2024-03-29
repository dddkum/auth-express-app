import classnames from 'classnames'
import styles from './Navbar.module.scss'
import { useMutation } from '@tanstack/react-query'
import $api from '../../../app/api/api.ts'
import { useAuthStore } from '../../../app/store/auth_store.ts'
import { useCustomToast } from '../../../shared/hooks/UseCustomToast/UseCustomToast.ts'
import { AxiosError } from 'axios'
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

    return (
        <div className={styles.Navbar}>
            <div>
                <button
                    className={classnames(
                        styles.navbar_tab,
                        'btn',
                        'btn-outline-light'
                    )}
                >
                    Главная страница
                </button>
                <button
                    className={classnames(
                        styles.navbar_tab,
                        'btn',
                        'btn-outline-light'
                    )}
                >
                    Галерея
                </button>
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
