import Product from "../models/productSchema.js";
import cloudinary from "../services/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    // Check if required fields are present
    const { title, price, quantity, subcategoryId, description } = req.body;
    if (!title || !price || !quantity || !subcategoryId || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if images are present
    const images = req.files;
    if (!images || images.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }
    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      })
    );
    console.log(imageUrls)
    const newProduct = new Product({ ...req.body, images: imageUrls });

    const savedProduct = await newProduct.save();

    res
      .status(200)
      .json({ message: "Product added successfully", savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);

    // Check for specific errors
    if (error.name === "MulterError") {
      // Multer error (e.g., file size exceeded)
      return res.status(400).json({ error: "File upload error" });
    }

    // Handle other unexpected errors
    res.status(500).json({ error: "Internal server error" });
  }
};

export { addProduct };
