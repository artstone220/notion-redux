import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserError,
  selectUserLoading,
} from "../../redux/slices/userSlice/userSelector";
import { login } from "../../redux/slices/userSlice/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector(selectUserError);
  const loading = useSelector(selectUserLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      dispatch(login(email, password));

      if (!loading) {
        navigate("/home");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Вход</h1>
      {error && <p className="error-message">{error}</p>}
      {errors && <p className="error-message">{errors}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
            autoComplete="current-password"
            placeholder="Пароль"
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p className="registration-prompt">
        <button onClick={() => navigate("/")}>Еще не зарегистрированы?</button>
      </p>
    </div>
  );
};

export default Login;
