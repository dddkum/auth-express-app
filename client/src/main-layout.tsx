import "./main.scss";
import {useEffect} from "react";
import {checkAuth} from "./services/auth_service";

const MainLayout = ({children}) => {

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default MainLayout;
