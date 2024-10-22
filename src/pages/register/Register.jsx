

function Register() {
    return (
        <div class="form-container">
            <h2>Регистрирай се</h2>
            <form>
                <label for="username">Потребителско име</label>
                <input type="text" id="username" name="username" required />

                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label for="password">Парола</label>
                <input type="password" id="password" name="password" required />

                <label for="confirmPassword">Повтори паролата</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required />

                <input type="submit" class="btn__register" value="Регистрирай се" />
            </form>

            <div class="have__account">
                <small>Имаш акаунт?</small>
                <a href="/login">Натисни тук</a>
            </div>
        </div>


    )
}

export default Register;