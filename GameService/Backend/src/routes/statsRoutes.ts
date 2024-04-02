import { Context, Hono } from "hono";
import {getGamesRating, getPersonalRating, getWinsRating} from "../controllers/statsControllers";
import {verifyToken} from "../middleware/authMiddleware";

const statsRoutes = new Hono();
statsRoutes.use(verifyToken)

statsRoutes.get('/wins', async (c: Context) => {
    return await getWinsRating(c);
});

statsRoutes.get('/games', async (c: Context) => {
    return await getGamesRating(c);
});

statsRoutes.get('/ratings', async (c: Context) => {
    return await getPersonalRating(c);
})

export default statsRoutes;