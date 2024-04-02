import 'dotenv/config';

export const accessPublicKey = await Bun.file("jwt_public_key.pem").text();
export const accessPrivateKey = await Bun.file("jwt_key.pem").text();

export const refreshPublicKey = await Bun.file("jwt_public_key2.pem").text();
export const refreshPrivateKey = await Bun.file("jwt_key2.pem").text();

export const config = {
    origin: process.env.FRONTEND_URL ?? 'http://localhost',
    port: process.env.BACKEND_PORT ?? 3000,
    kafkaBrokers: [
        process.env.KAFKA_BROKER_ONE ?? 'localhost:9092',
        process.env.KAFKA_BROKER_TWO ?? 'localhost:9093',
        process.env.KAFKA_BROKER_THREE ?? 'localhost:9094'
    ],
};
