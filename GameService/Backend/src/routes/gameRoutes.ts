import { Context, Hono } from 'hono';
import {connect, getRoom, getRoomById} from "../controllers/gameController";
import {verifyToken} from "../middleware/authMiddleware";
import {joinRoomById} from "../controllers/roomController";
import {createBunWebSocket} from 'hono/bun'
import {broadcast, connections} from "../common/wsConfig";



const gameRoutes = new Hono();
gameRoutes.use(verifyToken)

//@ts-ignore
gameRoutes.get('/:roomId', connect);

//@ts-ignore
gameRoutes.get('/get', async (c: Context) => {
    broadcast(JSON.stringify({fist: "Large"}))
    return c.text("a")
    //return await connect(c);
})

export default gameRoutes;