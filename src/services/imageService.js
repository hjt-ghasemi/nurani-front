import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/dua_image";

function upload(image, tags) {
  const tagsNewFormat = {};
  tags.forEach((tag, index) => (tagsNewFormat[`tags[${index}]`] = tag));

  return http.post(
    apiEndpoint,
    { image, ...tagsNewFormat },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

function edit(id, image, tags) {
  const tagsNewFormat = {};
  tags.forEach((tag, index) => (tagsNewFormat[`tags[${index}]`] = tag));

  const object = { ...tagsNewFormat };

  if (image) object.image = image;

  return http.post(`${apiEndpoint}/${id}`, object, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const getImages = (pageNumber, tag) => {
  return http.get(`${apiEndpoint}s?page=${pageNumber}&tag=${tag}`);
};

const deleteImage = (id) => {
  return http.delete(`${apiEndpoint}/${id}`);
};

const imageService = {
  upload,
  edit,
  getImages,
  deleteImage,
};

export default imageService;
