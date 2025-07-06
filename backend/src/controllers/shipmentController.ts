import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { database } from '../models/database';
import { AuthRequest } from '../middleware/auth';
import { CreateShipmentRequest, Shipment, TrackingEvent } from '../models/types';
import { generateTrackingNumber, calculateEstimatedDelivery } from '../utils/helpers';

export const createShipmentValidation = [
  body('senderName').notEmpty().withMessage('Sender name is required'),
  body('senderAddress').notEmpty().withMessage('Sender address is required'),
  body('receiverName').notEmpty().withMessage('Receiver name is required'),
  body('receiverAddress').notEmpty().withMessage('Receiver address is required'),
  body('packageSize').isIn(['small', 'medium', 'large', 'extra-large']).withMessage('Invalid package size'),
];

export const createShipment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const userId = req.userId!;
    const shipmentData: CreateShipmentRequest = req.body;
    const trackingNumber = generateTrackingNumber();
    const estimatedDelivery = calculateEstimatedDelivery(shipmentData.packageSize);

    const db = database.getDatabase();
    
    db.run(
      `INSERT INTO shipments (
        trackingNumber, userId, senderName, senderAddress, senderPhone,
        receiverName, receiverAddress, receiverPhone, packageSize, weight,
        description, status, estimatedDelivery
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        trackingNumber,
        userId,
        shipmentData.senderName,
        shipmentData.senderAddress,
        shipmentData.senderPhone || null,
        shipmentData.receiverName,
        shipmentData.receiverAddress,
        shipmentData.receiverPhone || null,
        shipmentData.packageSize,
        shipmentData.weight || null,
        shipmentData.description || null,
        'pending',
        estimatedDelivery.toISOString(),
      ],
      function (err) {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ message: 'Failed to create shipment' });
          return;
        }

        const shipmentId = this.lastID;

        // Create initial tracking event
        db.run(
          'INSERT INTO tracking_events (shipmentId, status, description) VALUES (?, ?, ?)',
          [shipmentId, 'pending', 'Shipment created and pending pickup'],
          (err) => {
            if (err) {
              console.error('Tracking event error:', err);
            }
          }
        );

        res.status(201).json({
          message: 'Shipment created successfully',
          shipment: {
            id: shipmentId,
            trackingNumber,
            status: 'pending',
            estimatedDelivery,
            ...shipmentData,
          },
        });
      }
    );
  } catch (error) {
    console.error('Create shipment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserShipments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const db = database.getDatabase();

    db.all(
      'SELECT * FROM shipments WHERE userId = ? ORDER BY createdAt DESC',
      [userId],
      (err, shipments) => {
        if (err) {
          res.status(500).json({ message: 'Failed to fetch shipments' });
          return;
        }

        res.json({ shipments });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getShipmentByTracking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { trackingNumber } = req.params;
    const userId = req.userId!;
    const db = database.getDatabase();

    db.get(
      'SELECT * FROM shipments WHERE trackingNumber = ? AND userId = ?',
      [trackingNumber, userId],
      (err, shipment) => {
        if (err) {
          res.status(500).json({ message: 'Server error' });
          return;
        }

        if (!shipment) {
          res.status(404).json({ message: 'Shipment not found' });
          return;
        }

        // Get tracking events
        db.all(
          'SELECT * FROM tracking_events WHERE shipmentId = ? ORDER BY timestamp ASC',
          [(shipment as any).id],
          (err, events) => {
            if (err) {
              res.status(500).json({ message: 'Failed to fetch tracking events' });
              return;
            }

            res.json({
              shipment,
              trackingEvents: events,
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateShipmentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { trackingNumber } = req.params;
    const { status, location, description } = req.body;
    const userId = req.userId!;

    if (!['pending', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered', 'cancelled'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const db = database.getDatabase();

    // First check if shipment exists and belongs to user
    db.get(
      'SELECT id FROM shipments WHERE trackingNumber = ? AND userId = ?',
      [trackingNumber, userId],
      (err, shipment: any) => {
        if (err) {
          res.status(500).json({ message: 'Server error' });
          return;
        }

        if (!shipment) {
          res.status(404).json({ message: 'Shipment not found' });
          return;
        }

        // Update shipment status
        const updateFields = ['status = ?'];
        const updateValues = [status];

        if (status === 'delivered') {
          updateFields.push('actualDelivery = ?');
          updateValues.push(new Date().toISOString());
        }

        updateValues.push(trackingNumber, userId);

        db.run(
          `UPDATE shipments SET ${updateFields.join(', ')}, updatedAt = CURRENT_TIMESTAMP 
           WHERE trackingNumber = ? AND userId = ?`,
          updateValues,
          function (err) {
            if (err) {
              res.status(500).json({ message: 'Failed to update shipment' });
              return;
            }

            // Add tracking event
            db.run(
              'INSERT INTO tracking_events (shipmentId, status, location, description) VALUES (?, ?, ?, ?)',
              [shipment.id, status, location || null, description || null],
              (err) => {
                if (err) {
                  console.error('Tracking event error:', err);
                }
              }
            );

            res.json({ message: 'Shipment status updated successfully' });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
