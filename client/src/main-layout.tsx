import './main.scss'
import { ReactNode, useEffect } from 'react'
import { checkAuth } from './services/auth_service'

interface Props {
    children: ReactNode
}
const MainLayout = ({ children }: Props) => {
    useEffect(() => {
        checkAuth()
    }, [])

    return <div>{children}</div>
}

export default MainLayout
