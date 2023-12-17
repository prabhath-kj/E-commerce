import Product from "../models/productSchema.js";
import cloudinary from "../services/cloudinary.mjs";

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
    console.log(imageUrls);
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

const getPaginatedProducts = async (req, res) => {
  try {
    // Destructuring the query parameters from the request URL
    const { page = 1, pageSize = 6, subcategory = "" } = req.query;

    // Parsing the page and pageSize variables as integers with a default radix of 10
    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);

    // Calculating the start and end index for the slice of products to fetch
    const startIndex = (parsedPage - 1) * parsedPageSize;
    const endIndex = startIndex + parsedPageSize;

    // Build a filter object based on the presence of subcategory
    const filter = subcategory == false ? {} : { subcategoryId: subcategory };

    // Counting the total number of products based on the filter
    const totalProducts = await Product.countDocuments(filter);

    // Calculating the total number of pages based on the pageSize
    const totalPages = Math.ceil(totalProducts / parsedPageSize);

    // Fetching the products for the current page using skip and limit, applying the filter
    const paginatedProducts = await Product.find(filter)
      .skip(startIndex)
      .limit(parsedPageSize);

    res.json({
      paginatedProducts,
      totalPages,
    });
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const query = req.body.query;

    if (!query) {
      return res
        .status(200)
        .json({ message: "Query parameter 'query' required" });
    }


    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).exec();

    if (products.length === 0) {
      return res.status(200).json(products);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const modifyWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    // Check if the product and user exist
    const product = await Product.findById(productId);
    const user = req.user

    if (!product || !user) {
      return res.status(404).json({ message: 'Product or user not found' });
    }

    // Check if the product is already in the wishlist
    const isProductInWishlist = user.wishlist.find((product)=>product?._id==productId);

    if (isProductInWishlist) {
      // Remove the product from the user's wishlist
      user.wishlist = user.wishlist.filter((wish) => wish._id != productId);
      await user.save();
      res.status(200).json({ message: 'Product removed from wishlist', user });
    } else {
      // Add the product to the user's wishlist
      user.wishlist.push(product);
      await user.save();
      res.status(200).json({ message: 'Product added to wishlist', user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { addProduct, getPaginatedProducts, getSingleProduct, searchProduct,modifyWishlist };
