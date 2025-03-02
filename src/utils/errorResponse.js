export const errorResponse = (res, message, error, statusCode = 500) => {
    res.status(statusCode).json({ message, error, success: false });
};