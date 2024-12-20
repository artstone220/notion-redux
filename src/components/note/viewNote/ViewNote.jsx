import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import "./ViewNote.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/userSlice/userSelector";

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        if (response.data.userId === currentUser.id) {
          setNote(response.data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };

    fetchNote();
  }, [id, currentUser]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Заметка не найдена или у вас нет доступа к ней.</h2>
        <button onClick={() => navigate("/notes")} className="action-button">
          Вернуться к заметкам
        </button>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="notes-container">
      <div className="header">
        <h1>Просмотр заметки</h1>
        <div className="button-container">
          <button onClick={() => navigate(-1)} className="action-button">
            Назад
          </button>
          <Link to={`/edit-note/${note.id}`} className="action-button">
            Редактировать
          </Link>
          <button
            onClick={handleDelete}
            className="action-button delete-button"
          >
            Удалить
          </button>
        </div>
      </div>
      <h2 className="note-title">{note.title}</h2>
      <p className="note-description">{note.content}</p>
    </div>
  );
};

export default ViewNote;
