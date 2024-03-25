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

    return (
        <>
            {/*here will be sidebar and header*/}
            <div className="container-fluid">{children}</div>
        </>
    )
}

export default MainLayout
