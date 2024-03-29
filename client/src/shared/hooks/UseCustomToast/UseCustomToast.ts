import { toast } from 'react-toastify'

interface ICustomToastProps {
    message: string
    type: 'info' | 'success' | 'warning' | 'error' | 'default'
}

export const useCustomToast = ({ message, type }: ICustomToastProps) => {
    toast(message, {
        type: type,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        autoClose: 5000,
        position: 'bottom-right',
        draggable: true,
        theme: 'dark'
    })
}
