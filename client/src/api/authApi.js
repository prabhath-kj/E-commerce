import instance from "../api/axiosInstance";

const authApi = {
  login: async (credentials) => {
    try {
      const response = await instance.post("auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (credentials) => {
    try {
      const response = await instance.post("auth/signup", credentials);
      return response.data;
    } catch (error) {
      throw error;
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

// Add more functions for registration, password recovery, etc.

export default authApi;
