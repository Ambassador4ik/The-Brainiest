import { createBunWebSocket } from 'hono/bun'
import {PrismaClient} from "@prisma/client";
import {WebSocketMessage} from "../controllers/gameController";

type WSReadyState = 0 | 1 | 2 | 3;
export type WSContext = {
    send(source: string | ArrayBuffer | Uint8Array, options?: { compress: boolean }): void;
    raw?: unknown;
    binaryType: BinaryType;
    readyState: WSReadyState;
    url: URL | null;
    protocol: string | null;
    close(code?: number, reason?: string): void;
};

export const { upgradeWebSocket, websocket } = createBunWebSocket();

const prisma = new PrismaClient();

// Maps userId to their WSContext
export const userConnections = new Map<number, WSContext>();

// Maps room ID to a Set of userIds
export const roomConnections = new Map<string, Set<number>>();

// Adds a user to a room
export const addToRoom = (roomId: string, userId: number, client: WSContext) => {
    userConnections.set(userId, client);  // Map the user ID to the WSContext
    if (!roomConnections.has(roomId)) {
        roomConnections.set(roomId, new Set<number>());
    }
    roomConnections.get(roomId)?.add(userId);
    console.log(`User ${userId} added to room ${roomId}`);
}

// Removes a user from a room
export const removeFromRoom = (roomId: string, userId: number) => {
    if (roomConnections.has(roomId)) {
        const userSet = roomConnections.get(roomId);
        if (userSet?.delete(userId)) {
            console.log(`User ${userId} removed from room: ${roomId}`);
        } else {
            console.log(`Failed to remove user ${userId} from room: ${roomId}`);
        }
        if (userSet?.size === 0) {
            roomConnections.delete(roomId);
        }
    }
    userConnections.delete(userId);  // Remove the WSContext when user leaves the room
}

// Broadcasts a message to all users in a room
export const broadcast = (roomId: string, message: WebSocketMessage) => {
    const userSet = roomConnections.get(roomId);
    if (userSet) {
        console.log(`Broadcasting message to ${userSet.size} users in room ${roomId}`);
        userSet.forEach(userId => {
            const client = userConnections.get(userId);
            if (client && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
}

export const listConnectionsByRoom = (roomId: string): { connection: WSContext, userId: number }[] => {
    const userList: { connection: WSContext, userId: number }[] = [];
    const userSet = roomConnections.get(roomId);
    if (userSet) {
        userSet.forEach(userId => {
            const client = userConnections.get(userId);
            if (client) {
                userList.push({ connection: client, userId: userId });
            }
        });
    }
    return userList;
}