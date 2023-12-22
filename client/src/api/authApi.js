import instance from "../api/axiosInstance";
const authApi = {
  login: async (credentials) => {
    try {
      const response = await instance.post("auth/login", credentials);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid username or password");
      } else {
        throw error;
      }
    }
  },

  signup: async (credentials) => {
    try {
      const response = await instance.post("auth/signup", credentials);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Username or email already exists");
      } else {
        throw error;
      }
    }
  },

  logout: async () => {
    try {
      const response = await instance.post("auth/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;
