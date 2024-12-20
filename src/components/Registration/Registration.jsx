import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/userSlice/userActions";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isPasswordStrong = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers;
  };

  const generateRandomPassword = () => {
    const length = 12;
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const allChars = upperCaseChars + lowerCaseChars + numberChars;

    let password = "";
    password +=
      upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password +=
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];

    for (let i = 3; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(password);
    setConfirmPassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateEmail(email)) {
      setError("Введите корректный адрес электронной почты");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!isPasswordStrong(password)) {
      setError(
        "Пароль должен быть длиной не менее 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру."
      );
      return;
    }

    const userData = {
      email,
      password,
      creationDate: new Date().toISOString(),
    };

    try {
      dispatch(register(userData));
      setSuccess(true);
      navigate("/home");
    } catch (error) {
      setError("Ошибка при регистрации. Попробуйте еще раз.");
      console.error("Ошибка регистрации:", error);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="registration-container">
      <h1>Регистрация</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Регистрация успешна!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            autoComplete="email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Пароль"
            name="password"
            autoComplete="new-password"
          />
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Подтвердите пароль"
            name="confirmPassword"
            autoComplete="new-password"
          />
        </div>
        <button
          type="button"
          className="generate-password-button"
          onClick={generateRandomPassword}
        >
          Случайный пароль
        </button>
        <button type="submit" className="submit-button">
          Зарегистрироваться
        </button>
      </form>
      <p>
        <button onClick={() => navigate("/login")}>
          Уже зарегистрированы?
        </button>
      </p>
    </div>
  );
};

export default Registration;
