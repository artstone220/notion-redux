import { NoteApi } from "../../../api/NoteApi"

export const getNoteById = id => async dispatch => {
    dispatch({ type: "NOTES/REQUEST/PENDING" })
    try {
        const note = await NoteApi.getNoteById(id)
        dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: note });
    } catch (error) {
        dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
    }
}

export const getAllNotes = userId => async dispatch => {
    dispatch({ type: "NOTES/REQUEST/PENDING" });
    try {
        const notes = await NoteApi.getAllNotesByUserId(userId);
        dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: notes });
    } catch (error) {
        dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
    }
};

export const createNewNote = newNote => async dispatch => {
    dispatch({ type: "NOTES/REQUEST/PENDING" });
    try {
        const note = await NoteApi.createNote(newNote);
        dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: note });
    } catch (error) {
        dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
    }
};

export const deleteNote = (id, userId) => async dispatch => {
    dispatch({ type: "NOTES/REQUEST/PENDING" });
    try {
        await NoteApi.deleteNote(id);
        const notes = await NoteApi.getAllNotesByUserId(userId);
        dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: notes });
    } catch (error) {
        dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
    }
};

export const editNote = (id, candidate) => async dispatch => {
    dispatch({ type: "NOTES/REQUEST/PENDING" });
    try {
        const note = await NoteApi.editNote(id, candidate);
        dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: note });
    } catch (error) {
        dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
    }
};