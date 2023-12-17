import SubCategorySchema from "../models/subCategory.js";

const addSubcategory = async (req, res) => {
  const { categoryId, subcategoryName } = req.body;
  try {
    // Check if request body is empty
    if (!categoryId || !subcategoryName) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    // Check if the subcategory already exists
    const existingSubcategory = await SubCategorySchema.findOne({
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

const getAllSubcategory = async (req, res) => {
  try {

    // Fetch subcategories based on categoryId
    const subcategories = await Subcategory.find({});
    res.json(subcategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Fetch subcategories based on categoryId
    const subcategories = await Subcategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addSubcategory, getSubcategory,getAllSubcategory };
