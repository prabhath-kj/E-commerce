// routes/subcategoryRoutes.js
import express from 'express';
import { addSubcategory } from '../controllers/subcategoryController.js';

const router = express.Router();

// Add a new subcategory
router.post('/subcategories', addSubcategory);

export default router;
