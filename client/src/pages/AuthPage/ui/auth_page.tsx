import background from '../../../shared/images/auth_background.webp'
import { LoginForm } from '../../../widgets/Login'
export const AuthPage = () => {
    return (
        <div
            className="d-flex justify-content-around"
            style={{ paddingTop: '90px' }}
        >
            <LoginForm />
            <img
                src={background}
                className="w-100 h-100 position-fixed top-0 start-0"
                style={{ zIndex: '-1' }}
                alt="background-image"
            />
        </div>
    )
}
