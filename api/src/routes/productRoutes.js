import express from "express";
import upload from "../services/upload.js"

import {
  addProduct
} from "../controllers/productController.js";
const router = express.Router();

// router.get("/categories", getAllCategories);

router.post("/addProduct",upload.array("images",3) ,addProduct);

export default router;
