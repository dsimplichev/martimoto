import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Register from "../register/Register";
import { Eye, EyeOff, Check, X } from "lucide-react";
import "./login.css";

function Login({ onClose }) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  
  const criteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    digit: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Моля, попълнете всички полета.");
      return;
    }
    try {
      await login(formData.email, formData.password);
      onClose();
    } catch (err) {
      setError("Грешна парола или имейл.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("log-modal")) onClose();
  };

  return (
    <div className="log-modal" onClick={handleOverlayClick}>
      <div className="log-container">
        {isRegistering ? (
          <Register onClose={onClose} onLoginClick={() => setIsRegistering(false)} />
        ) : (
          <div className="log-form">
            <h2 className="log-title">Вход в профила</h2>
            {error && <p className="log-error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Имейл</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={onChange}
                autoComplete="email"
                required
              />

              <label htmlFor="password">Парола</label>
              <div className="log-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={onChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="log-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Скрий паролата" : "Покажи паролата"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              
              <div className="log-criteria">
                <div className={`log-criterion ${criteria.length ? "valid" : ""}`}>
                  {criteria.length ? <Check size={16} /> : <X size={16} />}
                  <span>Минимум 8 символа</span>
                </div>
                <div className={`log-criterion ${criteria.uppercase ? "valid" : ""}`}>
                  {criteria.uppercase ? <Check size={16} /> : <X size={16} />}
                  <span>Голяма буква (A-Z)</span>
                </div>
                <div className={`log-criterion ${criteria.lowercase ? "valid" : ""}`}>
                  {criteria.lowercase ? <Check size={16} /> : <X size={16} />}
                  <span>Малка буква (a-z)</span>
                </div>
                <div className={`log-criterion ${criteria.digit ? "valid" : ""}`}>
                  {criteria.digit ? <Check size={16} /> : <X size={16} />}
                  <span>Цифра (0-9)</span>
                </div>
                <div className={`log-criterion ${criteria.special ? "valid" : ""}`}>
                  {criteria.special ? <Check size={16} /> : <X size={16} />}
                  <span>Специален знак (!@#$...)</span>
                </div>
              </div>

              <button type="submit" className="log-submit">
                Вход
              </button>
            </form>

            <div className="log-footer">
              Нямате профил?{" "}
              <span className="log-link" onClick={() => setIsRegistering(true)}>
                Регистрация
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;