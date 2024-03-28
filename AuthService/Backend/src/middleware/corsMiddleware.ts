import { cors } from 'hono/cors';
import { config } from '../common/environment';

const corsMiddleware = cors({
    origin: config.origin,
    credentials: true,
});

export default corsMiddleware;