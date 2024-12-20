import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/userSlice/userSelector";

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser)

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        {currentUser ? `Привет, ${currentUser.email}` : "Привет, гость!"}
      </div>
      <div className="header-right">
        <Link to="/home">Главная</Link>
        <Link to="/notes">Заметки</Link>
        {currentUser ? (
          <button onClick={handleLogout} className="logout-button">
            Выход
          </button>
        ) : (
          <Link to="/login" className="login-link">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
