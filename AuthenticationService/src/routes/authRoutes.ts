import {Context, Hono} from 'hono';
import {loginUser, registerUser} from "../controllers/authController";

const authRoutes = new Hono();

authRoutes.post('/login', async (c: Context)=> {
    return await loginUser(c);
});

authRoutes.post('/register', async (c: Context)=> {
    return await registerUser(c);
});

export default authRoutes;