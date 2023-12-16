// controllers/subcategoryController.js
import Subcategory from '../models/subcategorySchema.js';

const addSubcategory = async (req, res) => {
  const { categoryName, subcategoryName } = req.body;
  try {
    // Check if request body is empty
    if (!categoryName || !subcategoryName) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    // Check if the subcategory already exists
    const existingSubcategory = await Subcategory.findOne({
      categoryName: categoryName.toLowerCase(),
      subcategoryName: subcategoryName.toLowerCase(),
    });

    if (existingSubcategory) {
      return res.status(409).json({ error: 'Subcategory already exists' });
    }

    // Create and save the new subcategory
    const subcategory = new Subcategory({
      categoryName: categoryName.toLowerCase(),
      subcategoryName: subcategoryName.toLowerCase(),
    });
    const savedSubcategory = await subcategory.save();

    res.status(201).json({ message: 'Subcategory added successfully', data: savedSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { addSubcategory };
