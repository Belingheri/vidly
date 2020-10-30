import axios from "axios";

axios.interceptors.response.use(null, (errors) => {
  console.log(errors);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
