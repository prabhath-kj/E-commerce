import express from "express"
import addCategory from "../controllers/categoryController.js";
const router = express.Router();




router.post('/categories', addCategory);

export default router