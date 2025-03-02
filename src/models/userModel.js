import mongoose from 'mongoose';
import { UserRoles } from '../constants/userRoles.js';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.USER
    },
    profilePhoto: {
        type: String,
        required: false // Optional field for profile photo
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;