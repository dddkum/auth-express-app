import {useCurrentUserStore} from "../store/currentUser";
import {login, register} from '../services/AuthService'

function LoginForm() {
    const {email, password, setEmail, setPassword} = useCurrentUserStore();

    return (
        <div className='text-center'>
            <h1>LOGIN FORM</h1>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='text'
                placeholder='password'
            />
            <button onClick={() => login(email, password)}>Вход</button>
            <button onClick={() => register(email, password)}>Регистрация</button>
        </div>
    );
}

export default LoginForm;