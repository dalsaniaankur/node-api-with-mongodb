import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './utils/db.js';
import logger from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

startServer();