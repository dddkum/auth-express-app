import { toast } from 'react-toastify'

interface ICustomToastProps {
    message: string
    type: 'info' | 'success' | 'warning' | 'error' | 'default'
    theme: 'light' | 'dark'
}

export const customToast = ({ message, type, theme }: ICustomToastProps) => {
    return toast(message, {
        type: type,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        autoClose: 2000,
        position: 'top-left',
        draggable: true,
        theme: theme,
    })
}
