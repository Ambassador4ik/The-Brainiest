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
                profile_picture: 'https://abrakadabra.fun/uploads/posts/2021-12/thumbs/1639258975_25-abrakadabra-fun-p-znak-voprosa-na-chernom-fone-25.jpg'
            },
            select: {
                id: true
            }
        });

        await producer.send({
            topic: 'user-profile-created',
            messages: [{value: JSON.stringify(newUser)}]
        });
    }
}

export default initUserProfile;