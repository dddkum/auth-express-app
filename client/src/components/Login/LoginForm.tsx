import {useState} from "react";
import {submitLogin, submitRegister} from "./helpers";

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='text-center'>
            <h1>Форма входа</h1>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
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
                                        <button className="btn btn-primary" onClick={(e) => submitLogin(e, email, password)}>Вход</button>
                                        <button className="btn btn-secondary ms-2" onClick={(e) => submitRegister(e, email, password)}>Регистрация</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
