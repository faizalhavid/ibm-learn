import { ServerWebSocket } from "bun";
import { MessageRequest } from "../types/message";

const topic = 'message-topic';

export function messageWebSocketHandler() {
    return {
        onOpen(_: any, ws: ServerWebSocket) {
            ws.subscribe(topic);
            console.log(`[WS] Client connected and subscribed to '${topic}'`);
        },
        async onMessage(evt: { data: string; }, ws: ServerWebSocket) {
            try {
                const data: MessageRequest = JSON.parse(typeof evt.data === 'string' ? evt.data : '');
                // Simpan ke database jika perlu
                // await prismaClient.message.create({ data: { ...data } });

                // Broadcast ke semua client
                ws.publish(topic, JSON.stringify({
                    ...data,
                    sentAt: new Date().toISOString()
                }));
                console.log('[WS] Message broadcast:', data);
            } catch (e) {
                ws.send(JSON.stringify({ error: 'Invalid message format' }));
            }
        },
        onClose(_: any, ws: ServerWebSocket) {
            ws.unsubscribe(topic);
            console.log(`[WS] Client unsubscribed from '${topic}'`);
        }
    };
}