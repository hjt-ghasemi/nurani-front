import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/images";

async function upload(image, tags) {
  await http.post(
    apiEndpoint,
    { image, tags: JSON.stringify(tags) },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const imageService = {
  upload,
};

export default imageService;
