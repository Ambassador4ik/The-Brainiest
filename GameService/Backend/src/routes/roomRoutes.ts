import { Context, Hono } from 'hono';
import {createRoom, getAllRooms, joinRoom} from '../controllers/roomController'
import {verifyToken} from "../middleware/authMiddleware";

const roomRoutes = new Hono();
roomRoutes.use(verifyToken)

roomRoutes.get('/get-all', async (c: Context) => {
    return await getAllRooms(c);
})

roomRoutes.post('/create', async (c: Context)=> {
    return await createRoom(c);
});

roomRoutes.post('/join', async (c: Context) => {
    return await joinRoom(c);
})

export default roomRoutes;