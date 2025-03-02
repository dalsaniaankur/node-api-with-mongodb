import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profilePhotos'); // Directory to save profile photos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: fileFilter
}).single('profilePhoto');

// Function to handle file upload
export const uploadProfilePhoto = (file) => {
    return new Promise((resolve, reject) => {
        upload(file, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(file.path);
            }
        });
    });
};
