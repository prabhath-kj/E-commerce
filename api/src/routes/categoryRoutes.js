import express from "express";
import {authenticateJWT} from "../middlewares/jwtMiddleware.js"
import {
  addCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/categories", getAllCategories);

router.post("/categories",authenticateJWT, addCategory);

export default router;
