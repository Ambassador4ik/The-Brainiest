import 'dotenv/config'
import { Context } from 'hono';
import { PrismaClient, Prisma } from "@prisma/client";
import { getAccessToken, getRefreshToken } from "../common/jwtWorkers";

const prisma = new PrismaClient();

export const loginUser = async (c: Context) => {
    try {
        const body = await c.req.json()

        const user = await prisma.user.findUnique({
            where: { username: body.username }
        });

        if (!user) return c.json({ message: 'User Not Found' }, 404);

        const passwordValid = await Bun.password.verify(body.password, user.hashed_password);
        if (passwordValid) {
            const accessToken = await getAccessToken({id: user.id, username: user.username})
            const refreshToken = await getRefreshToken({id: user.id, username: user.username})
            await prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: refreshToken }
            })

            return c.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            }, 200);

        } else {
            return c.json({ message: 'Invalid Password' }, 401);
        }
    } catch (error) {
        console.error(error);
        return c.json({ message: 'An error occurred during login' }, 500);
    }
};

export const registerUser = async (c: Context) => {
    try {
        const body = await c.req.json()

        const hashedPassword = await Bun.password.hash(body.password, {
            algorithm: "argon2id",
            memoryCost: 4,
            timeCost: 3
        });

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                hashed_password: hashedPassword
            },
            select: {
                id: true,
                username: true,
            }
        });

        const accessToken = await getAccessToken(newUser)
        const refreshToken = await getRefreshToken(newUser)

        await prisma.user.update({
            where: { id: newUser.id },
            data: { refreshToken: refreshToken }
        })

        return c.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        }, 200);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return c.json({ message: 'Username already exists' }, 400);
        } else if (error instanceof Error) {
            console.error(error.message);
            return c.json({ message: 'An error occurred during registration' }, 500);
        }
        console.error('An unknown error occurred during registration.');
        return c.json({ message: 'An unknown error occurred during registration' }, 500);
    }
};