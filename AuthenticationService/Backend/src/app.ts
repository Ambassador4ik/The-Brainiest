import { Hono } from 'hono';
import authRoutes from "./routes/authRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import { cors } from "hono/cors";
import runConsumer from "./kafka/kafkaConsumer";
import { serve } from 'bun';

const app = new Hono();

app.use(cors({ origin: '*' }));
app.route('/auth', authRoutes);
app.route('/token', tokenRoutes);

const startServer = async () => {
    try {
        await runConsumer();
        console.log('Kafka consumer initialized successfully.');

        serve({
            port: 3000,
            fetch: app.fetch,
        });
        console.log('Server running on port 3000');
    } catch (error) {
        console.error('Failed to initialize Kafka consumer:', error);
    }
};

await startServer();
