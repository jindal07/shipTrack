const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { database } = require('../models/database');

const registerValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, firstName, lastName, phone, address } = req.body;

    // Check if user already exists
    const db = database.getDatabase();
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        res.status(500).json({ message: 'Server error' });
        return;
      }

      if (row) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      db.run(
        `INSERT INTO users (email, password, firstName, lastName, phone, address) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [email, hashedPassword, firstName, lastName, phone || null, address || null],
        function (err) {
          if (err) {
            res.status(500).json({ message: 'Server error' });
            return;
          }

          // Generate JWT token
          const token = jwt.sign(
            { userId: this.lastID },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
          );

          res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
              id: this.lastID,
              email,
              firstName,
              lastName,
              phone,
              address,
            },
          });
        }
      );
    });
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    const db = database.getDatabase();
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) {
          res.status(500).json({ message: 'Server error' });
          return;
        }

        if (!user) {
          res.status(400).json({ message: 'Invalid credentials' });
          return;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(400).json({ message: 'Invalid credentials' });
          return;
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET || 'fallback_secret',
          { expiresIn: '7d' }
        );

        const userResponse = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        res.json({
          message: 'Login successful',
          token,
          user: userResponse,
        });
      }
    );
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  register,
  login,
};
