import { KafkaClient, Producer, Consumer } from 'kafka-node';

const kafkaClientOptions = { kafkaHost: 'localhost:9092' };
const client = new KafkaClient(kafkaClientOptions);

export const producer = new Producer(client);
export const consumer = new Consumer(client, [{ topic: 'auth-topic', partition: 0 }], {
    autoCommit: false
});

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
    console.error('Producer error:', error);
});

consumer.on('message', (message) => {
    console.log('Message consumed:', message);
});

consumer.on('error', (error) => {
    console.error('Consumer error:', error);
});