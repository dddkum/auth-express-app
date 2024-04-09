import logo from '../../../shared/images/logo.svg'
import { LoginForm } from '../../../widgets/Login'
export const AuthPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-around min-vh-100">
            <LoginForm />
            <img src={logo} width={400} alt="logo" />
        </div>
    )
}
