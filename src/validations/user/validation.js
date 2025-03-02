import { check, validationResult } from 'express-validator';
import User from '../../models/userModel.js';
import { UserRoles } from '../../constants/userRoles.js';

export const validateCreateUser = [
    check('first_name').not().isEmpty().withMessage('First name is required to proceed.'),
    check('last_name').not().isEmpty().withMessage('Last name is required to proceed.'),
    check('email').isEmail().withMessage('Valid email is required to proceed.'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    check('role').isIn(Object.values(UserRoles)).withMessage('Invalid role.'),
    check('email').custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('This email is already in use. Please try a different one.');
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        next();
    }
];

export const validateUpdateUser = [
    check('first_name').not().isEmpty().withMessage('First name is required to proceed.'),
    check('last_name').not().isEmpty().withMessage('Last name is required to proceed.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        next();
    }
];
