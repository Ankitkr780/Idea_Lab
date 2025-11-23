import express from 'express';
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getMyItems
} from '../controllers/itemController.js';

import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { itemValidation } from '../utils/validators.js';

const router = express.Router();

// ----- Public Routes -----
router.get('/', getItems);
router.get('/:id', getItem);

// ----- Protected Routes -----

// Create Item
router.post(
  '/',
  protect,
  upload.array('images', 5),
  itemValidation,
  createItem
);

// Update Item
router.put(
  '/:id',
  protect,
  upload.array('images', 5),
  updateItem
);

// Delete Item
router.delete('/:id', protect, deleteItem);

// 🔥 Route for logged-in user’s items (My Items page depends on this)
router.get('/my/items', protect, getMyItems);

export default router;
