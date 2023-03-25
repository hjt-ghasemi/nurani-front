import config from "../config.json";
import http from "./httpService";

const tokenKey = "token-nurani";
const apiEndpoint = config.apiUrl + "/login";

function getToken() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

async function login(email, password, remember) {
  const {
    data: { token },
  } = await http.post(apiEndpoint, { email, password });

  if (remember) {
    localStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.setItem(tokenKey, token);
  }

  return token;
}

function logout() {
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenKey);
}

const auth = { getToken, login, logout };

export default auth;
