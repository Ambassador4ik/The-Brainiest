import { Hono } from 'hono';
import authRoutes from "./routes/authRoutes";

const app = new Hono();

app.route('/auth', authRoutes)

export default app;