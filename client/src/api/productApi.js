import instance from "./axiosInstance";

const productApi = {
  addProduct: async (productData) => {
    try {
      const response = await instance.post("/products", productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCategory: async (categoryData) => {
    try {
      const response = await instance.post("/category/categories", categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addSubcategory: async (subcategoryData) => {
    try {
      const response = await instance.post("/subcategories", subcategoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productApi;
