import {Context, Hono} from 'hono'
import {serve} from "bun";
import runConsumer from "./kafka/kafkaConsumer";
import roomRoutes from "./routes/roomRoutes";
import gameRoutes from "./routes/gameRoutes";

import {joinRoomById} from "./controllers/roomController";
import {getRoomById} from "./controllers/gameController";


import {upgradeWebSocket, websocket} from "./common/wsConfig";

const app = new Hono().get(
    '/ws',
    upgradeWebSocket(() => {
      return {
        onMessage: (event) => {
          console.log(event.data)
        },
      }
    })
)

app.route('/room', roomRoutes);
app.route('/game', gameRoutes);


const startServer = async () => {
    try {
        await runConsumer();
        console.log('Kafka consumer initialized successfully');

        Bun.serve({
            port: 3002,
            fetch: app.fetch,
            websocket: websocket
        });
        console.log('Server running on port 3002');

    } catch (error) {
        console.error('Failed to initialize Kafka consumer:', error);
    }
}

await startServer();