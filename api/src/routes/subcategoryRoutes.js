// routes/subcategoryRoutes.js
import express from "express";
import {
  addSubcategory,
  getSubcategory,
  getAllSubcategory,
} from "../controllers/subcategoryController.js";

const router = express.Router();

router.get("/", getAllSubcategory);

router.get("/:categoryId", getSubcategory);

router.post("/subcategories", addSubcategory);

export default router;
