import { Hono } from 'hono';
import authRoutes from "./routes/authRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import { cors } from "hono/cors";
import runConsumer from "./kafka/kafkaConsumer";

const app = new Hono();

app.use(cors({ origin: 'http://localhost:5173', credentials: true}));
app.route('/auth', authRoutes);
app.route('/token', tokenRoutes);

const startServer = async () => {
    try {
        await runConsumer();
        console.log('Kafka consumer initialized successfully');

        Bun.serve({
            port: 3000,
            fetch: app.fetch,
        });
        console.log('Server running on port 3000');
    } catch (error) {
        console.error('Failed to initialize Kafka consumer:', error);
    }
};

await startServer();
