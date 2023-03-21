import http from "./httpService";

async function upload(image, tags) {
  await http.post(
    "http://localhost:4000/api/images",
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
