import { Context, Hono } from 'hono';
import {getPublicKey, refreshTokens, verifyAccessToken} from '../controllers/tokenController';

const tokenRoutes = new Hono();

tokenRoutes.post('/refresh', async (c: Context)=> {
    return await refreshTokens(c);
})

tokenRoutes.post('/verify', async (c: Context)=> {
    return await verifyAccessToken(c);
})

tokenRoutes.get('/key', async (c: Context) => {
    return await getPublicKey(c);
})

export default tokenRoutes;