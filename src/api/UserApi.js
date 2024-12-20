import api from "../api";

export class UserApi {

    static login = async (email, password) => {
        try {
            const response = await api.get(
                `/users?email=${email}&password=${password}`
            );
            console.log(response);
            
            return response.data[0]
        } catch (error) {
            throw new Error("Ошибка при входе.")
        }
    }

    static authenticate = async id => {
        try {
            api.patch(`/users/${id}`, { isLoggedIn: true });
        } catch (error) {
            throw new Error("Ошибка при аутентификации.")
        }
    }

    static register = async userData => {
        try {
            await api.post("/users", userData);
        } catch (error) {
            throw new Error("Ошибка при регистрации.")
        }
    }
}