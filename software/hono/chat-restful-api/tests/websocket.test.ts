import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { usersTest, UserTest } from "./test-utils";


describe('Message WebSocket Controller', () => {
    beforeEach(async () => {
        await UserTest.create(usersTest[0]);
    })
    it('should handle WebSocket connections', async () => {
        await new Promise<void>((resolve, reject) => {
            const ws = new WebSocket('ws://localhost:3000/ws');
            ws.onopen = () => {
                console.log('WebSocket connection established');
                expect(ws.readyState).toBe(WebSocket.OPEN);
                ws.close();
                resolve();
            };
            ws.onerror = (error) => {
                reject(error);
            };
        });
    });

    it('should broadcast messages to all clients', () => {
        const ws1 = new WebSocket('ws://localhost:3000/ws');
        const ws2 = new WebSocket('ws://localhost:3000/ws');

        ws1.onopen = () => {
            ws1.send(JSON.stringify({ type: 'message', content: 'Hello from ws1' }));
        };

        ws2.onmessage = (event) => {
            console.log('ws2 received:', event.data);
            expect(event.data).toContain('Hello from ws1');
        };
    });
    afterEach(async () => {
        await UserTest.delete(usersTest[0].username);
    });
});
