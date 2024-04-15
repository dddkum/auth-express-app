import { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import $api from '@/app/api/api.ts'
import { useAuthStore } from '@/app/store/auth_store.ts'

interface Props {
    children: ReactNode
}
const MainLayout = ({ children }: Props) => {
    const { setToken } = useAuthStore()

    useQuery({
        queryKey: ['checkAuth'],
        queryFn: async () => {
            const response = await $api.get('/refresh', {
                withCredentials: true,
            })
            setToken(response.data.accessToken)
            return response.data
        },
        staleTime: 300000,
    })

    return <div className="container-fluid">{children}</div>
}

export default MainLayout
