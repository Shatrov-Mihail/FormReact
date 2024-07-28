import { useState, useRef } from "react";
import styles from "./app.module.css";

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const submitButtonRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);

  const validateEmail = (email) => {
    if (!email) return 'Введите почту.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Неправильный формат почты.';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Введите пароль.';
    if (password.length < 8) return 'Пароль должен содержать 8 символов';
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) return 'Пароли не совпадают';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));

    if (value.length > 20) {
      passwordRef.current.focus();
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const error = validatePassword(value);
    setPasswordError(error);

    if (!error && value.length >= 8) {
      confirmPasswordRef.current.focus();
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    const error = validateConfirmPassword(value);
    setConfirmPasswordError(error);

    if (!error && password.length >= 8) {
      submitButtonRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(confirmPassword);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (!emailValidationError && !passwordValidationError && !confirmPasswordValidationError) {
      console.log({ email, password, confirmPassword });
      submitButtonRef.current.focus();
    } else {
      if (confirmPasswordValidationError) {
        confirmPasswordRef.current.focus();
      } else if (passwordValidationError) {
        passwordRef.current.focus();
      }
    }
  };

  return (
    <div className={styles.app}>
      <h2>Регистрация нового пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            ref={passwordRef}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            ref={confirmPasswordRef}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPassword.length > 0 && confirmPassword !== password && (
            <div className="error">Пароли не совпадают</div>
          )}
        </div>
        <button
          type="submit"
          ref={submitButtonRef}
          disabled={!email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default App;
