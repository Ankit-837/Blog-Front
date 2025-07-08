import axios from "axios";

// export const baseURL = "http://localhost:5000/api";
export const baseURL =
  "https://blog-backend-production-1be0.up.railway.app/api";

if (!baseURL) {
  console.error(
    "> BaseURL error, please check your env file or visit api/ClientFunction.jsx file to see more details..., Thanks!..."
  );
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequest = async (method, url, data = null, customHeaders = {}) => {
  const token = localStorage.getItem("token");
  const validMethods = ["get", "post", "put", "delete", "patch"];
  if (!validMethods.includes(method.toLowerCase())) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  const config = {
    method,
    url,
    headers: {
      ...customHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  // Only attach data if method is not delete
  if (data && method.toLowerCase() !== "delete") {
    config.data = data;
  }

  try {
    const response = await api(config);
    return response?.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchData = (url) => handleRequest("get", url);
export const postData = (url, data) => handleRequest("post", url, data);
export const updateData = (url, data) => handleRequest("put", url, data);
export const deleteData = (url) => handleRequest("delete", url);
export const requestData = (method, url, data) =>
  handleRequest(method, url, data);
