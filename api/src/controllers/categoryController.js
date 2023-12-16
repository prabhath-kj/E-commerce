// controllers/categoryController.js
import Category from "../models/categorySchema.js";

export const addCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    // Check if request body is empty
    if (!categoryName) {
      return res.status(400).json({ error: "Request body is empty" });
    }


    // Check if category already exists
    const existingCategory = await Category.findOne({
      categoryName: categoryName.toUpperCase(),
    });

    if (existingCategory) {
      return res.status(409).json({ error: "Category already exists" });
    }

    // Create and save the new category
    const category = new Category({
      categoryName: categoryName.toUpperCase(),
    });
    const savedCategory = await category.save();

    res
      .status(201)
      .json({ message: "Category added successfully", data: savedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

