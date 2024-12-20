import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice/userSelector";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleNavigateToNotes = () => {
    navigate("/notes");
  };

  return (
    <div className="home-container">
      <h1>Добро пожаловать!</h1>
      {user ? (
        <div className="user-info-container">
          <div className="user-info">
            <span className="label">Почта:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="user-info">
            <span className="label">Дата регистрации:</span>
            <span className="value">
              {new Date(user.creationDate).toLocaleString()}
            </span>
          </div>
          <button onClick={handleNavigateToNotes}>Перейти к заметкам</button>
        </div>
      ) : (
        <p>Пользователь не найден. Пожалуйста, зарегистрируйтесь.</p>
      )}
    </div>
  );
};

export default Home;
