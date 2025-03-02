import User from '../models/userModel.js';
import { uploadProfilePhoto } from '../utils/fileUpload.js'; // Assuming a utility for file uploads
import { errorResponse } from '../utils/errorResponse.js';

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        // const profilePhoto = await uploadProfilePhoto(req.file); // Handle file upload
        const newUser = new User({ first_name, last_name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User has been successfully created.', user: newUser, success: true });
    } catch (error) {
        errorResponse(res, 'An error occurred while creating the user. Please try again later.', error.message);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Sorry, we could not find the user you are looking for.', success: false });
        }
        res.status(200).json(user);
    } catch (error) {
        errorResponse(res, 'We encountered an error while fetching the user. Please try again later.', error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        const updatedData = { first_name, last_name };

        if (req.file) {
            updatedData.profilePhoto = await uploadProfilePhoto(req.file); // Handle file upload
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Sorry, we could not find the user you are trying to update.', success: false });
        }
        res.status(200).json({ message: 'User updated successfully.', user, success: true });
    } catch (error) {
        errorResponse(res, 'We encountered an error while updating the user. Please try again later.', error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Sorry, we could not find the user you are trying to delete.', success: false });
        }
        res.status(200).json({ message: 'The user has been deleted successfully.', success: true });
    } catch (error) {
        errorResponse(res, 'We encountered an error while deleting the user. Please try again later.', error.message);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json({ users, success: true });
    } catch (error) {
        errorResponse(res, 'We encountered an error while fetching the users. Please try again later.', error.message);
    }
};