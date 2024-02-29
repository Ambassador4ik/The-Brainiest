import { Context } from 'hono';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginUser = async (c: Context) => {
    c.status(201)
    const body = await c.req.json()

    const userLoad = await prisma.user.findFirst({
        where: {
            username: body['username']
        }
    })

    if (await Bun.password.verify(body['password'], userLoad!.hashed_password)) {
        return c.json( { 'Login': 'True' })
    } else {
        return c.json( { 'Login': 'False' })
    }
};

export const registerUser = async (c: Context) => {
    c.status(201)
    const body = await c.req.json()

    await prisma.user.create({
        data: {
            username: body['username'],
            hashed_password: await Bun.password.hash(body['password'], {
                algorithm: "argon2id",
                memoryCost: 4,
                timeCost: 3
            })
        }
    })

    return c.json( JSON.stringify({ 'Register': 'True' }))
};