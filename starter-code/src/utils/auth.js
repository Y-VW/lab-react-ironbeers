import Axios from "axios";
import qs from "qs";
import {createBrowserHistory} from "history";
const history = createBrowserHistory();

const axios = Axios.create ({
    baseURL: "https://ih-beers-api.herokuapp.com/auth/", 
    withCredentials: true,
    headers: {"content-type": "application/x-www-form-urlencoded"}
});

export const login = (user) => {
    return axios({
        method: "POST",
        url: "login",
        headers: {"content-type": "application/x-www-form-urlencoded"},
        data: qs.stringify(user)
    })
    .then(response => {
        setUser(response.data)
    })
}

export const signup = (user) => {
    return axios ({
        method: "POST",
        url: "signup",
        data: qs.stringify(user)
    })
    .then(response => {
        setUser(response.data);
    })
}

export const loggedIn = () => {
    const user = getUser();
    return !!user;
}

export const logout = () => {
    return axios ({
        url: "/logout"
    })
    .then((response) => {
        localStorage.removeItem("user");
        history.push("/")
    })
}

export const setUser = (user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
    return JSON.parse(window.localStorage.getItem("user"));
}