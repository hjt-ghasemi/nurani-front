import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An Unexpected Error Occurrred.");
  }

  return Promise.reject(error);
});

function setAuth(auth) {
  if (auth) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuth,
};
export default httpService;
