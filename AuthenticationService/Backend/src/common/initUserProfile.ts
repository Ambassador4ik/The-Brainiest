import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const initUserProfile = async function (userJSON: string) {
    const user = JSON.parse(userJSON)

    if (typeof user.id == 'number') {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                isProfileInitialised: true
            }
        })
    }
}

export default initUserProfile;