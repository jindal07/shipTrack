import { Router } from 'express';
import {
  createShipment,
  getUserShipments,
  getShipmentByTracking,
  updateShipmentStatus,
  createShipmentValidation,
} from '../controllers/shipmentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All shipment routes require authentication
router.use(authMiddleware);

router.post('/', createShipmentValidation, createShipment);
router.get('/', getUserShipments);
router.get('/:trackingNumber', getShipmentByTracking);
router.put('/:trackingNumber/status', updateShipmentStatus);

export default router;
