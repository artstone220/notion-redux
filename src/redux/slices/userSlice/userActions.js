import { UserApi } from "../../../api/UserApi";

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: "USER/REQUEST/PENDING" });
    try {
        const user = await UserApi.login(email, password);
        if (!user) {
            throw new Error("Неверный логин или пароль.")
        }
        dispatch({ type: "USER/REQUEST/FULFILLED", payload: user });
    } catch (error) {
        console.log("++++");
        dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
    }
};

export const authenticate = (id) => async (dispatch) => {
    dispatch({ type: "USER/REQUEST/PENDING" });
    try {
        await UserApi.authenticate(id);
        dispatch({ type: "USER/REQUEST/FULFILLED"});
    } catch (error) {
        dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
    }
};

export const register = (userData) => async (dispatch) => {
    dispatch({ type: "USER/REQUEST/PENDING" });
    try {
        const user = await UserApi.register(userData);
        dispatch({ type: "USER/REQUEST/FULFILLED", payload: user });
    } catch (error) {
        dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
    }
};

export const logOutUser = () => async (dispatch) => {
    dispatch({ type: "USER/REQUEST/FULFILLED", payload: null });
};