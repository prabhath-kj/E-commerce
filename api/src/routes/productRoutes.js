import express from "express";
import multer from "../services/upload.js";
import {authenticateJWT} from "../middlewares/jwtMiddleware.js"
import {
  addProduct,
  getPaginatedProducts,
  getSingleProduct,
  searchProduct,
  modifyWishlist,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getPaginatedProducts);
router.get("/:productId", getSingleProduct);
router.post("/searchProduct", searchProduct);
router.post("/addProduct",authenticateJWT, multer.array ("images", 3), addProduct);
router.get("/wishList/:productId",authenticateJWT, modifyWishlist);


export default router;
