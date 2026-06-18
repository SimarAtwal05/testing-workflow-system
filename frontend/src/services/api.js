const API = axios.create({
  baseURL: "http://13.235.103.108:5000/api"
});

api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;
