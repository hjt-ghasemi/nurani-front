import config from "../config.json";
import http from "./httpService";

const tokenKey = config.storageTokenKey;
const apiEndpoint = config.apiUrl + "/login";

http.setAuth(getToken());

function getToken() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

async function login(email, password, remember) {
  const {
    data: { token },
  } = await http.post(apiEndpoint, { email, password });

  http.setAuth(token);
  if (remember) {
    localStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.setItem(tokenKey, token);
  }

  return token;
}

function logout() {
  http.setAuth(null);
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenKey);
}

const auth = { getToken, login, logout };

export default auth;
