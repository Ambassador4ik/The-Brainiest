import {config} from '../common/environment';
import logger, {pinoKafkaLogger} from '../common/logger';
import { Kafka, KafkaJSNumberOfRetriesExceeded, Partitioners } from 'kafkajs';

const kafkaConfig = {
    clientId: 'auth-service',
    brokers: config.kafkaBrokers,
    logCreator: pinoKafkaLogger
};

const kafka = new Kafka(kafkaConfig);
const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

try {
    await producer.connect();
} catch (error) {
    if (error instanceof KafkaJSNumberOfRetriesExceeded) {
        logger.error('KafkaJS: Unable to connect to broker: Number of retries exceeded')
        process.exit(1);
    } else {
        logger.error(error);
        process.exit(1)
    }
}

export default producer;
