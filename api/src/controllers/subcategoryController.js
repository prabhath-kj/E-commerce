// controllers/subcategoryController.js
import Subcategory from "../models/subcategorySchema.js";

const addSubcategory = async (req, res) => {
  const { categoryId, subcategoryName } = req.body;
  try {
    // Check if request body is empty
    if (!categoryId || !subcategoryName) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    // Check if the subcategory already exists
    const existingSubcategory = await Subcategory.findOne({
      category: categoryId,
      subcategoryName: subcategoryName.toLowerCase(),
    });

    if (existingSubcategory) {
      return res.status(409).json({ error: "Subcategory already exists" });
    }

    // Create and save the new subcategory
    const subcategory = new Subcategory({
      category: categoryId,
      subcategoryName: subcategoryName.toLowerCase(),
    });
    const savedSubcategory = await subcategory.save();

    res.status(201).json({
      message: "Subcategory added successfully",
      data: savedSubcategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addSubcategory };
