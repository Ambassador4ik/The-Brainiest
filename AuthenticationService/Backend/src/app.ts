import { Hono } from 'hono';
import authRoutes from "./routes/authRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import {cors} from "hono/cors";

const app = new Hono();

app.use(cors({origin: '*'}));

app.route('/auth', authRoutes);
app.route('/token', tokenRoutes);

export default app;