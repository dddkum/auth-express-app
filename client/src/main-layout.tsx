import './app/styles/main.scss'
import { ReactNode, useEffect } from 'react'
import { checkAuth } from './services/auth_service'
import { Navbar } from './widgets/Navbar'

interface Props {
    children: ReactNode
}
const MainLayout = ({ children }: Props) => {
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <>
            <div className="container-fluid">{children}</div>
            <Navbar />
        </>
    )
}

export default MainLayout
