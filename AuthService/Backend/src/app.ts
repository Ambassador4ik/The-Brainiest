import { Hono } from 'hono';
import logger from './common/logger';
import { config } from './common/environment';
import authRoutes from './routes/authRoutes';
import tokenRoutes from './routes/tokenRoutes';
import runConsumer from './kafka/kafkaConsumer';
import corsMiddleware from './middleware/corsMiddleware';
import errorMiddleware from './middleware/errorMiddleware';

const app = new Hono();

app.use(corsMiddleware);
app.use('*', errorMiddleware);

app.route('/auth', authRoutes);
app.route('/token', tokenRoutes);

app.get('/health', (c) => c.text('OK'));

const startServer = async () => {
    try {
        await runConsumer();
        logger.info('Kafka consumer initialized successfully');

        Bun.serve({
            port: config.port,
            fetch: app.fetch,
        });

        logger.info(`Server listening on port ${config.port}`);
    } catch (error) {
        logger.error('Failed to initialize Kafka consumer:', error);
    }
};

await startServer();
