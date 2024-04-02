import { Hono } from 'hono'
import userProfileRoutes from './routes/userProfileRoutes';
import runConsumer from './kafka/kafkaConsumer'
import {cors} from "hono/cors";
import { serve } from 'bun';

const app = new Hono();

app.use(cors({origin: 'http://localhost', credentials: true}));

app.route('/user', userProfileRoutes);

const startServer = async () => {
    try {
        await runConsumer();
        console.log('Kafka consumer initialized successfully');

        serve({
            port: 3001,
            fetch: app.fetch,
        });
        console.log('Server running on port 3001');

    } catch (error) {
        console.error('Failed to initialize Kafka consumer:', error);
    }
}

await startServer();