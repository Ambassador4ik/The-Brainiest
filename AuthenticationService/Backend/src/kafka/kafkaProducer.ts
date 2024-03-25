import { Kafka, Partitioners } from 'kafkajs';

const kafkaConfig = {
    clientId: 'auth-service',
    brokers: ['devdive.tech:9092'],
};

const kafka = new Kafka(kafkaConfig);
const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

await producer.connect();
export default producer;
