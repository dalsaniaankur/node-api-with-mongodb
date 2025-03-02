import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/errorResponse.js';

export const signup = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ first_name, last_name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User has been added successfully!', success: true });
    } catch (error) {
        errorResponse(res, 'An error occurred while creating the user. Please try again later.', error.message);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password. Please try again.', success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password. Please try again.', success: false });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.password = undefined;
        res.status(200).json({ token, message: `Welcome back ${user.first_name}`, user, success: true });

        // Uncomment the following lines if you want to set a cookie with the token
        // return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
        //     message: `Welcome back ${user.fullname}`,
        //     user,
        //     success: true
        // })
    } catch (error) {
        errorResponse(res, 'An error occurred while logging in. Please try again later.', error.message);
    }
};

export const logout = (req, res) => {

    // Write a logic to invalidate the token and log the user out
    res.status(200).json({ message: 'You’ve been logged out successfully!', success: true });

    // Uncomment the following lines if you want to clear the cookie
    // return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    //         message: "Logged out successfully.",
    //         success: true
    //     })
};
