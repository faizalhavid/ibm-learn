import { createBunWebSocket } from 'hono/bun';
import { ServerWebSocket } from 'bun';

export const topic = 'messages';
export const { upgradeWebSocket, websocket } = createBunWebSocket();

export const webSocketConfig = upgradeWebSocket((_) => ({
    onOpen(_, ws) {
        const rawWs = ws.raw as ServerWebSocket;
        rawWs.subscribe(topic);
        console.log(`WebSocket server opened and subscribed to topic '${topic}'`);
    },
    onMessage(evt, ws) {
        const rawWs = ws.raw as ServerWebSocket;
        const message = typeof evt.data === 'string' ? evt.data : '';
        rawWs.publish(topic, message);
        console.log('WebSocket message received and broadcast:', message);
    },
    onClose(_, ws) {
        const rawWs = ws.raw as ServerWebSocket;
        rawWs.unsubscribe(topic);
        console.log(`WebSocket server closed and unsubscribed from topic '${topic}'`);
    },
}));