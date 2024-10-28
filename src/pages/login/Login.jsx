



function Login() {
    return (
        <div className="modal__login">
            <div className='login__container'>
                <div className='login__form'>
                    <h2 className='login__title'>Вход</h2>
                    <div className='social-login'>
                        <ul className='social__wrap'>
                            <li className='google'>
                                <a href="#"><ImGoogle2 className='google__icon' />Вход с Google</a>
                            </li>
                            <li className='fb'>
                                <a href="#"><FaFacebook className='facebook__icon' />Вход с Facebook</a>
                            </li>
                        </ul>
                    </div>
                    <div className='or'>or</div>
                    <form>
                        
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id="email" />
                        <label htmlFor='password'>Парола</label>
                        <input type="password" name="password" id="password" onChange={onChange} />
                        <input className='btn__login' type="submit" value="Влез" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;