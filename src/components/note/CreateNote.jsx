import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notes.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice/userSelector";
import { createNewNote } from "../../redux/slices/notesSlice/noteActions";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Пожалуйста, заполните заголовок");
      return;
    }

    const newNote = {
      title,
      content,
      creationDate: new Date().toISOString(),
      userId: currentUser.id,
    };

    handleCreateNote(newNote);
  };

  const handleCreateNote = async (newNote) => {
    try {
      await dispatch(createNewNote(newNote));
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка при создании заметки:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="notes-container">
      <div className="header">
        <h1>Создать новую заметку</h1>
        <button onClick={handleBack} className="back-button">
          Назад
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название заметки"
            required
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введите содержимое заметки (необязательно)"
          />
        </div>
        <button type="submit" className="create-button">
          Создать заметку
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
