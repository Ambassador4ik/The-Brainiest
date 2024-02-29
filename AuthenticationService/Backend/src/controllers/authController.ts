import { Context } from 'hono';
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const loginUser = async (c: Context) => {
    try {
        const body = await c.req.json()

        const userLoad = await prisma.user.findUnique({
            where: { username: body.username }
        });

        if (!userLoad) {
            return c.json({ 'Login': 'False', 'Error': 'User not found.' }, 404);
        }

        const passwordValid = await Bun.password.verify(body.password, userLoad.hashed_password);
        if (passwordValid) {
            c.status(200);
            return c.json({ 'Login': 'True' });
        } else {
            return c.json({ 'Login': 'False', 'Error': 'Invalid password.' }, 401);
        }
    } catch (error) {
        console.error(error);
        return c.json({ 'Error': 'An error occurred during login.' }, 500);
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
            }
        });

        c.status(201);
        return c.json({ 'Register': 'True' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return c.json({ 'Register': 'False', 'Error': 'Username already exists.' }, 400);
        } else if (error instanceof Error) {
            console.error(error.message);
            return c.json({ 'Error': 'An error occurred during registration.' }, 500);
        }
        console.error('An unknown error occurred during registration.');
        return c.json({ 'Error': 'An unknown error occurred during registration.' }, 500);
    }
};