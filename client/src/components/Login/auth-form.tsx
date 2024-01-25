import {useState} from "react";
import {submitLogin, submitRegister} from "./helpers";

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="card border-0 rounded-lg bg-dark-secondary m-auto w-50">
            <div className="card-body">
                <form>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="email@example.com"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <label htmlFor="inputEmail">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <label htmlFor="inputPassword">Пароль</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <button className="btn btn-primary"
                                onClick={(e) => submitLogin(e, email, password)}>Вход
                        </button>
                        <button className="btn btn-dark-primary ms-2"
                                onClick={(e) => submitRegister(e, email, password)}>Регистрация
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
