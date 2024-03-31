import { Context, Hono } from 'hono';
import {connect, getRoom, getRoomById} from "../controllers/gameController";
import {verifyToken} from "../middleware/authMiddleware";


const gameRoutes = new Hono();
gameRoutes.use(verifyToken)

//@ts-ignore
gameRoutes.get('/:roomId', connect);

//@ts-ignore
gameRoutes.get('/get', async (c: Context) => {
    //return await connect(c);
})

export default gameRoutes;