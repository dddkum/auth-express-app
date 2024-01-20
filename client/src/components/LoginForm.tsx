import React from 'react';
import {useCurrentUserStore} from "../store/currentUser";

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
            <button>Вход</button>
            <button>Регистрация</button>
        </div>
    );
}

export default LoginForm;