// routes/subcategoryRoutes.js
import express from 'express';
import { addSubcategory,getSubcategory } from '../controllers/subcategoryController.js';

const router = express.Router();

// Add a new subcategory
router.post('/subcategories', addSubcategory);
router.get('/:categoryId', getSubcategory);


export default router;
