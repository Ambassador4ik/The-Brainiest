import 'dotenv/config'
import { Context } from 'hono';
import { PrismaClient, Prisma } from "@prisma/client";
import { getAccessToken, getRefreshToken } from "../common/jwtWorkers";
import producer from "../kafka/kafkaProducer";
import { setCookie } from 'hono/cookie'

const prisma = new PrismaClient();

export const loginUser = async (c: Context) => {
    try {
        const body = await c.req.json()

        const user = await prisma.user.findUnique({
            where: { username: body.username }
        });

        if (!user) return c.json({ message: 'User Not Found' }, 404);

        const passwordValid = await Bun.password.verify(body.password, user.password);
        if (passwordValid) {
            const accessToken = await getAccessToken({id: user.id, username: user.username})
            const refreshToken = await getRefreshToken({id: user.id, username: user.username})

            const token = await prisma.refreshToken.findUnique({
                where: {
                    device: body.deviceIdentifier
                }
            })

            if (token) {
                await prisma.refreshToken.update({
                    where: {
                        device: body.deviceIdentifier,
                        userId: user.id
                    },
                    data: {
                        token: refreshToken,
                    }
                });
            } else {
                await prisma.refreshToken.create({
                    data: {
                        userId: user.id,
                        token: refreshToken,
                        device: body.deviceIdentifier,
                        expiresAt: new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                });
            }

            // Set refresh token as httpOnly cookie
            setCookie(c,'refreshToken', refreshToken, {
                httpOnly: true,
                //secure: true, // Ensure this is set to false if you're testing without HTTPS
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                //sameSite: 'Strict',
                domain: 'localhost',
            });

            // Optionally, set access token as httpOnly cookie (or send it in response body for SPA usage)
            setCookie(c, 'accessToken', accessToken, {
                httpOnly: true,
                //secure: true, // Ensure this is set to false if you're testing without HTTPS
                path: '/',
                maxAge: 60 * 60, // 1h
                //sameSite: 'Strict',
                domain: 'localhost',
            });

            return c.json({
                message: 'Success!'
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
                password: hashedPassword
            },
            select: {
                id: true,
                username: true,
            }
        });

        const accessToken = await getAccessToken(newUser)
        const refreshToken = await getRefreshToken(newUser)

        await prisma.refreshToken.create({
            data: {
                userId: newUser.id,
                token: refreshToken,
                device: body.deviceIdentifier,
                expiresAt: new Date(new Date().setDate(new Date().getDate() + 30))
            }
        });

        await producer.send({
            topic: 'init-user',
            messages: [{ value: JSON.stringify(newUser) }],
        })

        // Set refresh token as httpOnly cookie
        setCookie(c,'refreshToken', refreshToken, {
            httpOnly: true,
            //secure: true, // Ensure this is set to false if you're testing without HTTPS
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            domain: 'localhost',
        });

        // Optionally, set access token as httpOnly cookie (or send it in response body for SPA usage)
        setCookie(c, 'accessToken', accessToken, {
            httpOnly: true,
            //secure: true, // Same note about HTTPS
            path: '/',
            maxAge: 60 * 60, // 1 Hour
            domain: 'localhost',
        });

        return c.json({
            message: 'Success!'
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