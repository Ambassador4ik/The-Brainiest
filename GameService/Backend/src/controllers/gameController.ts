import {Context} from "hono";
import {PrismaClient} from "@prisma/client";

import {joinRoomById} from "./roomController";
import {upgradeWebSocket, connections} from "../common/wsConfig";

const prisma = new PrismaClient();

export const getRoom = async (c: Context) => {
    const roomId = c.req.param('roomId');

    const room = await prisma.room.findUnique({
        where: {
            id: roomId
        },
        select: {
            id: true,
            question_count: true,
            time_per_question: true,
            player_count: true,
            name: true,
            players: true
        }
    })

    return c.json(room, 200);
}

export const getRoomById = async (roomId: string) => {
    return prisma.room.findUnique({
        where: {
            id: roomId
        },
        select: {
            id: true,
            question_count: true,
            time_per_question: true,
            player_count: true,
            name: true,
            players: true
        }
    });
}

type WSRequest = {
    type: 'getRoomData' | 'getUsers'
    data: {}
}

export const connect = upgradeWebSocket(async (c: Context) => {
    const roomId = c.req.param('roomId');
    const userId = (c as any).user.id;
    return {
        async onOpen(event, ws) {

            await joinRoomById(userId, roomId);
            const roomData = await getRoomById(roomId);

            ws.send(JSON.stringify(roomData))
            connections.add(ws)
        },
        async onMessage(event, ws) {
            const message = event.data;
            const request: WSRequest = JSON.parse(message.toString())
            if (request.type == 'getRoomData') {
                const roomData = await getRoomById(roomId);

                ws.send(JSON.stringify(roomData))
            }
            connections.add(ws)
        },
        onClose: () => {
            console.log('Connection closed')
        },
    }
});