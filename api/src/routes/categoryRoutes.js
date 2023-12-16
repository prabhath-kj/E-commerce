import express from "express";
import {
  addCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/categories", getAllCategories);

router.post("/categories", addCategory);

export default router;
