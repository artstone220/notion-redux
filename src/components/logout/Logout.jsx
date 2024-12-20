import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("persist:root")
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div>
      <h1>Выход</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Logout;
