import { config } from '../common/environment';
import {initUserProfile, initGameProfile} from '../common/initUserProfile';
import logger, { pinoKafkaLogger } from '../common/logger';
import { Kafka, KafkaJSNumberOfRetriesExceeded } from 'kafkajs';

const kafkaConfig = {
    clientId: 'auth-service',
    brokers: [config.kafkaBroker],
    logCreator: pinoKafkaLogger
};

const kafka = new Kafka(kafkaConfig);

const consumer = kafka.consumer({ groupId: 'auth-service-group' });

try {
    await consumer.connect();
} catch (error) {
    if (error instanceof KafkaJSNumberOfRetriesExceeded) {
        logger.error('KafkaJS: Unable to connect to broker: Number of retries exceeded');
        process.exit(1);
    } else {
        logger.error(error);
        process.exit(1);
    }
}

await consumer.subscribe({ topic: 'user-profile-created', fromBeginning: true });
await consumer.subscribe({ topic: 'game-profile-created', fromBeginning: true });

async function runConsumer() {
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (topic == 'user-profile-created' && message.value) {
                await initUserProfile(message.value.toString())
            }
            if (topic == 'game-profile-created' && message.value) {
                await initGameProfile(message.value.toString())
            }
        },
    });

    process.on('SIGTERM', async () => {
        await consumer.disconnect();
    });
}

export default runConsumer;
