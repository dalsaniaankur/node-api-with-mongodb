import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';
import { UserRoles } from '../constants/userRoles.js';
import { validateCreatePost, validateUpdatePost } from '../validations/post/validation.js';

const router = express.Router();

// Routes for post-related operations
router.post('/', authMiddleware, authorizeRoles(UserRoles.USER, UserRoles.ADMIN, UserRoles.MANAGER), validateCreatePost, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPostById);
router.put('/:id', authMiddleware, authorizeRoles(UserRoles.ADMIN, UserRoles.MANAGER), validateUpdatePost, updatePost);
router.delete('/:id', authMiddleware, authorizeRoles(UserRoles.ADMIN, UserRoles.MANAGER), deletePost);

export default router;