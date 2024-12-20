import { applyMiddleware, combineReducers, createStore } from "redux"
import { userReducer } from "./slices/userSlice/userReducer"
import { thunk } from "redux-thunk"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import { notesReducer } from "./slices/notesSlice/noteReducer"

const store = createStore(
    persistReducer({
        key: "root",
        storage,
        whitelist: ["user", "notes"]
    }, combineReducers({
        user: userReducer,
        notes: notesReducer
    })),
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.(applyMiddleware(thunk))
)

export default store
export const persist_store = persistStore(store)