import { Hono } from 'hono'
import userProfileRoutes from './routes/userProfileRoutes';
import runConsumer from './kafka/kafkaConsumer'
import {cors} from "hono/cors";

const app = new Hono();

app.use(cors({origin: '*'}));

app.route('/user', userProfileRoutes);

(async () => {
  try {
    await runConsumer();
    console.log('Kafka consumer initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Kafka consumer:', error);
  }
})();

export default {
  port: 3001,
  fetch: app.fetch,
}