import { PrismaClient, Prisma } from "@prisma/client";
import producer from "../kafka/kafkaProducer";

const prisma = new PrismaClient();

const initUserProfile = async function (userJSON: string) {
    const user = JSON.parse(userJSON)

    if (typeof user.id == 'number' && typeof user.username == 'string') {
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                username: user.username,
                profile_picture: 'https://www.shutterstock.com/image-vector/question-mark-icon-vector-illustration-600nw-545832988.jpg'
            },
            select: {
                id: true
            }
        });

        await producer.send({
            topic: 'user-profile-created',
            messages: [{value: JSON.stringify(newUser)}]
        })
    }
}

export default initUserProfile