import { Context, Next } from 'hono';
import axios, { AxiosError } from 'axios';

export const verifyToken = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        // Terminate the request-response cycle by returning a Response object
        return c.json({ message: 'Authorization header is missing.' }, 401);
    }

    try {
        const res = await axios.post('http://localhost:3000/token/verify', {}, {
            headers: { Authorization: authHeader }
        });

        // Status code 200 indicates a successful verification
        if (res.status === 200) {
            await next(); // Continue to the next middleware or route handler
        } else {
            // Any other status code is considered a failure to verify
            return c.json({ message: 'Access Denied due to verification failure.' }, 401);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle specific AxiosError cases based on the response status code
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const statusCode = error.response.status;
                switch (statusCode) {
                    case 400:
                        return c.json({ message: 'Invalid request to auth service.' }, 400);
                    case 401:
                        return c.json({ message: 'Unauthorized. Invalid token.' }, 401);
                    case 403:
                        return c.json({ message: 'Unauthorized. Token expired.' }, 403);
                    default:
                        return c.json({ message: 'Auth service error.' }, 500);
                }
            } else if (error.request) {
                // The request was made but no response was received
                return c.json({ message: 'Auth service did not respond.' }, 504); // Gateway Timeout
            } else {
                // Something happened in setting up the request that triggered an Error
                return c.json({ message: 'Error setting up auth request.' }, 500);
            }
        } else {
            // Handle non-Axios errors
            return c.json({ message: 'An unknown error occurred.' }, 500);
        }
    }
};