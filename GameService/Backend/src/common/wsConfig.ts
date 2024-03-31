import {createBunWebSocket} from 'hono/bun'
type WSReadyState = 0 | 1 | 2 | 3;
type WSContext = {
    send(source: string | ArrayBuffer | Uint8Array, options?: {
        compress: boolean;
    }): void;
    raw?: unknown;
    binaryType: BinaryType;
    readyState: WSReadyState;
    url: URL | null;
    protocol: string | null;
    close(code?: number, reason?: string): void;
};

export const { upgradeWebSocket, websocket } = createBunWebSocket();

export const roomConnections = new Map<string, Set<WSContext>>();

export const addToRoom = (roomId: string, client: WSContext) => {
    if (!roomConnections.has(roomId)) {
        roomConnections.set(roomId, new Set<WSContext>());
    }
    roomConnections.get(roomId)?.add(client);
}

export const removeFromRoom = (roomId: string, client: WSContext) => {
    if (roomConnections.has(roomId)) {
        const connections = roomConnections.get(roomId);
        connections?.delete(client);
        if (connections?.size === 0) {
            roomConnections.delete(roomId); // Optional: Cleanup if the room is empty
        }
    }
}

export const broadcast = (roomId: string, message: string) => {
    const connections = roomConnections.get(roomId);
    if (connections) {
        connections.forEach(
            (client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            }
        );
    }
}