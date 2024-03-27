import { Bounce, toast } from 'react-toastify'

interface IToastProps {
    message: string
    type: 'info' | 'success' | 'warning' | 'error' | 'default'
}
export const useToast = ({ message, type }: IToastProps) => {
    toast(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
        type: type,
    })
}
