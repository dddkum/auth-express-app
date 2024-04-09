import { toast } from 'react-toastify'

interface ICustomToastProps {
    message: string
    type: 'info' | 'success' | 'warning' | 'error' | 'default'
}

export const customToast = ({ message, type }: ICustomToastProps) => {
    return toast(message, {
        type: type,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        autoClose: 2000,
        position: 'bottom-center',
        draggable: true,
        theme: 'light',
    })
}
