import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/settings/dua";

function setDuaContent(value) {
  return http.post(apiEndpoint, { value });
}

function getDuaContent() {
  return http.get(apiEndpoint);
}

const duaContentSerivce = {
  setDuaContent,
  getDuaContent,
};

export default duaContentSerivce;
