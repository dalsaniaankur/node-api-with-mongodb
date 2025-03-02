import { check, validationResult } from 'express-validator';

export const validateCreatePost = [
    check('title').not().isEmpty().withMessage('Title is required to proceed.'),
    check('content').not().isEmpty().withMessage('Content is required to proceed.'),
    check('author').not().isEmpty().withMessage('Author is required to proceed.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        next();
    }
];

export const validateUpdatePost = [
    check('title').not().isEmpty().withMessage('Title is required to proceed.'),
    check('content').not().isEmpty().withMessage('Content is required to proceed.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        next();
    }
];
