const { Router } = require('express');
const { register, login, registerValidation, loginValidation } = require('../controllers/authController');

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
