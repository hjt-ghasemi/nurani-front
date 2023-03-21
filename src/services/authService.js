import jwt_decode from "jwt-decode";
import config from "../config.json";
import http from "./httpService";

const tokenKey = "token-nurani";
const apiEndpoint = config.apiUrl + "/auth";

http.setJwt(getJWT());

function getCurrentUser() {
  try {
    return jwt_decode(getJWT());
  } catch (ex) {
    return null;
  }
}

function getJWT() {
  return localStorage.getItem(tokenKey);
}

async function login(username, password) {
  const token = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, token);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

const auth = { getCurrentUser, login, logout };

export default auth;
