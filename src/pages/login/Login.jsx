import './login.css';
import React, { useState } from 'react';

import { ImGoogle2 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa6";
import Register from '../register/Register';

function Login( onClose, onCreateAccountClick ) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="modal__login">
            <div className='login__container'>
                <div className='login__form'>
                    <h2 className='login__title'>Login</h2>
                    <div className='social-login'>
                        <ul className='social__wrap'>
                            <li className='google'>
                                <a href="#"><ImGoogle2 className='google__icon' />Login with Google</a>
                            </li>
                            <li className='fb'>
                                <a href="#"><FaFacebook className='facebook__icon' />Login with Facebook</a>
                            </li>
                        </ul>
                    </div>
                    <div className='or'>or</div>
                    <form>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id="email" />
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" id="password" onChange={onChange} />
                        <input className='btn__login' type="submit" value="Login" />
                    </form>

                    <div className="register-prompt">
                        Don't have an account?{' '}
                        <span className="create-account" onClick={onCreateAccountClick}>Create Account</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;