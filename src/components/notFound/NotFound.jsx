import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но запрашиваемая страница не существует.</p>
      <Link to="/notes">Вернуться к заметкам</Link>
    </div>
  );
};

export default NotFound;
