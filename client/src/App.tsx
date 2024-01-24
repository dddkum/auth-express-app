import "./App.scss";
import LoginForm from "./components/Login/LoginForm";
import {useEffect} from "react";
import {checkAuth, logout} from "./services/AuthService";
import {useAuthStore} from "./store/auth";
import {useCurrentUserStore} from "./store/currentUser";

function App() {

    const {isAuthorized} = useAuthStore();
    const {user} = useCurrentUserStore();

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            <h1>{isAuthorized ? `Пользователь авторизован ${user?.email}` : <LoginForm/>}</h1>
            <button onClick={logout}>Выход</button>
        </div>
    )
}

export default App;
