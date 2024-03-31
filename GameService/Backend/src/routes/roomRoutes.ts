import { Context, Hono } from 'hono';
import {createRoom, joinRoom} from '../controllers/roomController'
import {verifyToken} from "../middleware/authMiddleware";

const roomRoutes = new Hono();
roomRoutes.use(verifyToken)

roomRoutes.post('/create', async (c: Context)=> {
    return await createRoom(c);
});

roomRoutes.post('/join', async (c: Context) => {
    return await joinRoom(c);
})

export default roomRoutes;