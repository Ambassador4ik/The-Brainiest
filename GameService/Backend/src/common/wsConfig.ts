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
export const connections = new Set<WSContext>();

export const broadcast = (message: string) => {
    connections.forEach(
        (client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    )
}