import { Kafka } from 'kafkajs';
import initUserProfile from "../common/initGameProfile";

const kafkaConfig = {
    clientId: 'game-service',
    brokers: ['localhost:9092'],
};

const kafka = new Kafka(kafkaConfig);

const consumer = kafka.consumer({ groupId: 'game-service-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'init-user', fromBeginning: true });

async function runConsumer() {
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (topic == 'init-user' && message.value) {
                await initUserProfile(message.value.toString())
            }
        },
    })

    process.on('SIGTERM', async () => {
        await consumer.disconnect();
    });
}

export default runConsumer;
