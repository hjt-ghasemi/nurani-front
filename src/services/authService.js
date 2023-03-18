import jwt_decode from "jwt-decode";

const tokenKey = "token-nurani";

function getCurrentUser() {
  try {
    return jwt_decode(getJWT());
  } catch (ex) {
    return null;
  }
}

function getJWT() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

const auth = { getCurrentUser };

export default auth;
