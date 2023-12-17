import express from "express";
import upload from "../services/upload.js";
import {
  addProduct,
  getPaginatedProducts,
  getSingleProduct,
  searchProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getPaginatedProducts);
router.get("/:productId", getSingleProduct);
router.post("/searchProduct", searchProduct);
router.post("/addProduct", upload.array("images", 3), addProduct);

export default router;
