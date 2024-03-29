import './app/styles/main.scss'
import { ReactNode } from 'react'
import { Navbar } from './widgets/Navbar'
import { useQuery } from '@tanstack/react-query'
import $api from './app/api/api.ts'
import { useAuthStore } from './app/store/auth_store.ts'

interface Props {
    children: ReactNode
}
const MainLayout = ({ children }: Props) => {
    const { setToken, token } = useAuthStore()

    useQuery({
        queryKey: ['checkAuth'],
        queryFn: async () => {
            const response = await $api.get('/refresh', {
                withCredentials: true,
            })
            setToken(response.data.accessToken)
            return response.data
        },
        refetchInterval: 60000,
    })

    return (
        <>
            {token && <Navbar />}
            <div className="container-fluid">{children}</div>
        </>
    )
}

export default MainLayout
