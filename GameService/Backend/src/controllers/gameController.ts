import {Context} from "hono";
import {PrismaClient} from "@prisma/client";

import {joinRoomById, leaveRoomById} from "./roomController";
import {
    upgradeWebSocket,
    addToRoom,
    removeFromRoom,
    broadcast,
    roomConnections,
    userConnections, listConnectionsByRoom
} from "../common/wsConfig";
import {BlitzGame, MockBlitzGame} from "../logic/blitzGame";

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

export type WebSocketMessage = {
    topic: 'roomUpdate' | 'gameStart'
    content: any
}

export const connect = upgradeWebSocket(async (c: Context) => {
    const roomId = c.req.param('roomId');
    const userId = (c as any).user.id;
    let game: BlitzGame | null = null;
    return {
        async onOpen(event, ws) {

            await joinRoomById(userId, roomId);
            const roomData = await getRoomById(roomId);

            addToRoom(roomId, userId, ws)
            broadcast(roomId, {
                topic: 'roomUpdate',
                content: roomData
            })

            if (roomData?.players.length! >= roomData?.player_count!) {
                broadcast(roomId, {
                    topic: 'gameStart',
                    content: 'The Game is to be started.'
                })
                game = MockBlitzGame(listConnectionsByRoom(roomId), roomData!.player_count);
            }

            //console.log(roomConnections)
        },
        async onMessage(event, ws) {
            const message = event.data;
            //const request: WSRequest = JSON.parse(message.toString())

            game!.next();
        },
        async onClose(event, ws) {
            removeFromRoom(roomId, userId);
            await leaveRoomById(userId);
            const roomData = await getRoomById(roomId);
            broadcast(roomId, {
                topic: 'roomUpdate',
                content: roomData
            })
            console.log('Connection closed')
        },
    }
});