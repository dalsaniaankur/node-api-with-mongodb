import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';
import { UserRoles } from '../constants/userRoles.js';
import { validateCreateUser, validateUpdateUser } from '../validations/user/validation.js';

const router = express.Router();

// User routes
router.post('/', authMiddleware, authorizeRoles(UserRoles.ADMIN), validateCreateUser, createUser); // Create a new user
router.get('/', authMiddleware, authorizeRoles(UserRoles.ADMIN), getAllUsers); // Get all users
router.get('/:id', authMiddleware, authorizeRoles(UserRoles.ADMIN, UserRoles.MANAGER), getUser); // Get user by ID
router.put('/:id', authMiddleware, authorizeRoles(UserRoles.ADMIN, UserRoles.MANAGER), validateUpdateUser, updateUser); // Update user by ID
router.delete('/:id', authMiddleware, authorizeRoles(UserRoles.ADMIN), deleteUser); // Delete user by ID

export default router;