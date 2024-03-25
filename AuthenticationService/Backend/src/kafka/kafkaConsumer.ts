import { Kafka } from 'kafkajs';

const kafkaConfig = {
    clientId: 'auth-service',
    brokers: ['devdive.tech:9092'],
};

const kafka = new Kafka(kafkaConfig);

const consumer = kafka.consumer({ groupId: 'auth-service-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'user-profile-created', fromBeginning: true });

async function runConsumer() {
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {

            }
        },
    })

    process.on('SIGTERM', async () => {
        await consumer.disconnect();
    });
}

export default runConsumer;
