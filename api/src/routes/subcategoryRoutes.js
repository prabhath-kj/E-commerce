// routes/subcategoryRoutes.js
import express from "express";
import {
  addSubcategory,
  getSubcategory,
  getAllSubcategory,
} from "../controllers/subcatController.js";
import {authenticateJWT} from "../middlewares/jwtMiddleware.js"


const router = express.Router();

router.get("/", getAllSubcategory);

router.get("/:categoryId", getSubcategory);

router.post("/subcategories",authenticateJWT, addSubcategory);

export default router;
