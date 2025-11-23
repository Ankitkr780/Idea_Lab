import express from 'express';
import {
  createRequest,
  getRequests,
  getRequest,
  updateRequestStatus,
  cancelRequest,
  getRequestStats
} from '../controllers/requestController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { requestValidation } from '../utils/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Common routes
router.get('/', getRequests);
router.get('/stats', getRequestStats);
router.get('/:id', getRequest);

// Receiver routes
// All users can create requests
router.post(
  '/',
  requestValidation,
  createRequest
);

// All users can cancel their requests
router.put(
  '/:id/cancel',
  cancelRequest
);

// All users can update request status for their items
router.put(
  '/:id/status',
  updateRequestStatus
);

export default router;
