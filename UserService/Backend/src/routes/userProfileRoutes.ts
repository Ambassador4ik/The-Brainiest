import {Context, Hono} from 'hono';
import { verifyToken } from "../common/middleware";
import {getUserProfile} from "../controllers/userProfileController";

const userProfileRoutes = new Hono();
userProfileRoutes.use(verifyToken)

userProfileRoutes.get('/profile', async (c: Context)=> {
    return await getUserProfile(c)
})

export default userProfileRoutes;