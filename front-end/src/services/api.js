import axios from "axios";

const api = axios.create({
  baseURL: "https://cms-react-davirds.herokuapp.com/",
});

export default api;
