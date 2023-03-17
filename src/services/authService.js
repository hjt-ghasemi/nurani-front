import jwt_decode from "jwt-decode";

function getCurrentUser() {
  try {
    return jwt_decode(getJWT());
  } catch (ex) {
    return null;
  }
}

function getJWT() {
  return localStorage.getItem("token");
}

const auth = { getCurrentUser };

export default auth;
