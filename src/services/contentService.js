import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/content";

function getContent() {
  return http.get(apiEndpoint);
}

function saveContent(dua, wellcome) {
  return http.post(apiEndpoint, { dua, wellcome });
}

const contentService = {
  getContent,
  saveContent,
};

export default contentService;
