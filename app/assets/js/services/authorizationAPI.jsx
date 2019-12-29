import axios from "axios";
import JWTDecode from "jwt-decode";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post("http://localhost:9000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            // Save the token in the local storage
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);
        });
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const {exp: expiration} = JWTDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const {exp: expiration} = JWTDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}