import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNote,
  selectNoteLoading,
} from "../../redux/slices/notesSlice/noteSelector";
import {
  editNote,
  getNoteById,
} from "../../redux/slices/notesSlice/noteActions";

const EditNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteFromStore = useSelector(selectNote);
  const loading = useSelector(selectNoteLoading);

  useEffect(() => {
    const fetchNote = async () => {
      await dispatch(getNoteById(id));
    };

    fetchNote();
  }, [dispatch, id]);

  useEffect(() => {
    if (noteFromStore) {
      setNote(noteFromStore);
    }
  }, [noteFromStore]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!note || !note.id) {
      console.error("Заметка не найдена, обновление невозможно.");
      return;
    }

    try {
      await dispatch(editNote(id, note));
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка при обновлении заметки:", error);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  if (!note || !note.title) {
    return <div>Заметка не найдена.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Название заметки"
        required
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        placeholder="Содержимое заметки"
        required
      />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EditNote;
