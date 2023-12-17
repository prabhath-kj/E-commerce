import instance from "./axiosInstance";

const productApi = {
  getProducts: async (payload) => {
    try {
      const response = await instance.get(`/products?page=${payload}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSingleProduct: async (productData) => {
    try {
      const response = await instance.get(`/products/${productData}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  searchProduct: async (productData) => {
    try {
      const response = await instance.post(
        `/products/searchProduct`,
        productData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await instance.post("/products/addProduct", productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCategory: async (categoryData) => {
    try {
      const response = await instance.post(
        "/category/categories",
        categoryData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addSubcategory: async (subcategoryData) => {
    try {
      const response = await instance.post(
        "/subcategory/subcategories",
        subcategoryData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const response = await instance.get("/category/categories");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchAllSubCategories: async () => {
    try {
      const response = await instance.get(`/subcategory`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchSubCategories: async (categoryId) => {
    try {
      const response = await instance.get(`/subcategory/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  modifyWishlist: async (payload) => {
    try {
      const response = await instance.get(`/products/wishList/${payload}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productApi;
