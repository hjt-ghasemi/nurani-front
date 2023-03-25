import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/settings/message";

function setMessage(value) {
  return http.post(apiEndpoint, { value });
}

function getMessage() {
  return http.get(apiEndpoint);
}

const messageService = {
  setMessage,
  getMessage,
};

export default messageService;
