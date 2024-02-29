import { Hono } from 'hono';
import authRoutes from "./routes/authRoutes";
import {cors} from "hono/cors";

const app = new Hono();

app.use(cors({origin: '*'}));

app.route('/auth', authRoutes);

export default app;