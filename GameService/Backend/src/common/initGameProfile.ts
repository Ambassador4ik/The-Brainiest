import { PrismaClient, Prisma } from "@prisma/client";
import producer from "../kafka/kafkaProducer";

const prisma = new PrismaClient();

const initGameProfile = async function (userJSON: string) {
    const user = JSON.parse(userJSON)

    if (typeof user.id == 'number' && typeof user.username == 'string') {
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                username: user.username,
            },
            select: {
                id: true
            }
        });

        await producer.send({
            topic: 'game-profile-created',
            messages: [{value: JSON.stringify(newUser)}]
        });
    }
}

export default initGameProfile;