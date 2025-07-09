const { Router } = require('express');
const {
  createShipment,
  getUserShipments,
  getShipmentByTracking,
  updateShipmentStatus,
  createShipmentValidation,
} = require('../controllers/shipmentController');
const { authMiddleware } = require('../middleware/auth');

const router = Router();

// All shipment routes require authentication
router.use(authMiddleware);

router.post('/', createShipmentValidation, createShipment);
router.get('/', getUserShipments);
router.get('/:trackingNumber', getShipmentByTracking);
router.put('/:trackingNumber/status', updateShipmentStatus);

module.exports = router;
