import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notes.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice/userSelector";
import {
  selectAllNotes,
  selectNoteLoading,
} from "../../redux/slices/notesSlice/noteSelector";
import {
  deleteNote,
  getAllNotes,
} from "../../redux/slices/notesSlice/noteActions";

const Notes = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const notesFromStore = useSelector(selectAllNotes);
  const dispatch = useDispatch();
  const loading = useSelector(selectNoteLoading);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        await dispatch(getAllNotes(currentUser.id));
      } catch (error) {
        console.error("Ошибка при загрузке заметок:", error);
      }
    };

    fetchNotes();
  }, [dispatch, currentUser.id]);

  useEffect(() => {
    if (notesFromStore.data) {
      setNotes(notesFromStore.data);
    }
  }, [notesFromStore]);

  const handleDeleteNote = async (id) => {
    try {
      await dispatch(deleteNote(id));
      await dispatch(getAllNotes(currentUser.id));
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    }
  };

  const handleCreateNote = () => {
    navigate("/create-note");
  };

  if (loading) return <div>Загрузка заметок...</div>;

  return (
    <div className="notes-container">
      <h1>Заметки</h1>
      <div className="button-container">
        <button className="add-note-button" onClick={handleCreateNote}>
          Добавить заметку
        </button>
      </div>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-content">
                <h2 className="note-title">
                  <Link to={`/notes/${note.id}`}>{note.title}</Link>
                </h2>
                <p className="note-description">{note.content}</p>
                <div className="note-meta">
                  <p className="creation-date">
                    {new Date(note.creationDate).toLocaleDateString()}
                  </p>
                  <div className="note-actions">
                    <Link to={`/edit-note/${note.id}`} className="edit-link">
                      ✍️
                    </Link>
                    <span
                      className="delete-icon"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      🗑
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>У вас нет заметок. Добавьте новую заметку!</p>
      )}
    </div>
  );
};

export default Notes;
