import api from "../api";

export class NoteApi {

    static createNote = async newNote => {
        try {
            const response = await api.post("/notes", newNote);
            return response.data
        } catch (err) {
            throw new Error("Ошибка при создании заметки.")
        }
    }

    static editNote = async (noteId, note) => {
        try {
            return await api.put(`/notes/${noteId}`, note);
        } catch (err) {
            throw new Error("Ошибка при обновлении заметки.")
        }
    }

    static getNoteById = async id => {
        try {
            const response = await api.get(`/notes/${id}`);
            return response.data
        } catch (err) {
            throw new Error("Ошибка при загрузке заметки.")
        }
    }

    static getAllNotesByUserId = async userId => {
        try {
            const response = await api.get(`/notes?userId=${userId}`)
            return response.data
        } catch (err) {
            throw new Error("Ошибка при загрузке заметок.")
        }
    }

    static deleteNote = async id => {
        try {
            await api.delete(`/notes/${id}`);
        } catch (err) {
            throw new Error("Ошибка при удалении заметки.")
        }
    }
}