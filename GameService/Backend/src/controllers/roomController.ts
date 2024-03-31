import {Context} from "hono";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

function generateId(length: number = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
    }
    return id;
}

export const createRoom = async (c: Context) => {
    // Expecting: room (name, question_count, time_per_question, player_count)
    const body = await c.req.json()

    const roomId = generateId();

    try {
        await prisma.room.create({
            data: {
                id: roomId,
                name: body.room_name,
                question_count: body.question_count,
                time_per_question: body.time_per_question,
                player_count: body.player_count
            }
        })
    } catch (err) {
        console.log(err)
        return c.json({message: "Unable to create room"}, 500)
    }

    return c.json({roomId: roomId}, 200)
}

export const joinRoom = async (c: Context) => {
    // Expecting: cookie with refresh token, room id to join
    const user = (c as any).user

    const roomId = (await c.req.json()).roomId

    if (!roomId) return c.json({message: 'Unable to join undefined room'}, 400);

    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                roomId: roomId
            }
        })

        return c.json({message: "Success!"}, 200)
    } catch (err) {
        console.log(err)
        return c.json({message: 'Unable to join room'}, 500)
    }
}

export const joinRoomById = async (userId: number, roomId: string) => {
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roomId: roomId
            }
        })

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}