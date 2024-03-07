import { Context, Hono } from 'hono';
import { refreshTokens, verifyAccessToken } from '../controllers/tokenController';

const tokenRoutes = new Hono();

tokenRoutes.post('/refresh', async (c: Context)=> {
    return await refreshTokens(c);
})

tokenRoutes.post('/verify', async (c: Context)=> {
    return await verifyAccessToken(c);
})

export default tokenRoutes;