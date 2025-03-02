import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../validations/auth/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

export default router;