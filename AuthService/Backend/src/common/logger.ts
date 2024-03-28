import pino, {Logger} from 'pino';
import { logLevel, LogEntry } from 'kafkajs';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            // ignore: 'pid,hostname',
        },
    },
});

const logLevelMap: { [index: number]: keyof Logger } = {
    [logLevel.ERROR]: 'error',
    [logLevel.WARN]: 'warn',
    [logLevel.INFO]: 'info',
    [logLevel.DEBUG]: 'debug',
    [logLevel.NOTHING]: 'silent'
};

/**
 * Custom log creator for KafkaJS that uses Pino for logging.
 */
export const pinoKafkaLogger = () => {
    return ({ namespace, level, label, log }: LogEntry) => {
        const { message, retryCount, retryTime } = log || {};
        const pinoLevel = logLevelMap[level];

        const retryInfo = retryCount && retryTime ? ` | RetryCount: ${retryCount}, RetryTime: ${retryTime}` : '';

        // If the KafkaJS log level is mapped to a Pino log level, log the message along with retryCount and retryTime.
        if (pinoLevel) {
            // @ts-ignore
            logger[pinoLevel]({
                msg: 'KafkaJS: ' + message + retryInfo,
            });
        }
    };
};

export default logger;