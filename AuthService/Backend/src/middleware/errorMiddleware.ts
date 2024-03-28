import logger from '../common/logger';
import { Context, MiddlewareHandler } from 'hono';

// Error handling middleware
const errorMiddleware: MiddlewareHandler = async (c: Context, next: Function) => {
    try {
        await next(); // Pass control to the next middleware or route handler
    } catch (err) {
        // @ts-ignore
        const status = err.status || 500;
        // @ts-ignore
        const message = err.message || 'Internal Server Error';

        // Log the error for debugging purposes
        logger.error(err)

        // Respond with the error status and message
        return c.json({ message }, status);
    }
};

export default errorMiddleware;