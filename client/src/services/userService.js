import axios from "axios";

const apiEndpoint = process.env.REACT_APP_API_URL + "/users/";

export const register = user => {
    return axios.post(apiEndpoint + 'register', user);
}

export const updateUser = async (id, data) => {
    await axios.put(apiEndpoint + id, data)
}

export const deleteUser = async (user) => {
    await axios.delete(apiEndpoint + user, user)
}