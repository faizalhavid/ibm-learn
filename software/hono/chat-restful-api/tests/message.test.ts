import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { MessageTest, UserTest } from "./test-utils";
import { PaginatedResponse } from "@/core/types/api-response";
import { MessagePublic } from "@/message/types/message";

const users = [
    { id: 'id-test1', username: 'testuser', email: 'test@mail.com', token: 'test' },
    { id: 'id-test2', username: 'testuser2', email: 'test2@mail.com', token: 'test2' }
]


describe('GET Message', () => {
    beforeEach(async () => {
        await UserTest.create(users[0].username, users[0].email, users[0].token, users[0].id);
    })
    it('should show all user messages', async () => {
        const response = await fetch('http://localhost:3000/messages', {
            method: 'GET',
            headers: { 'Authorization': users[0].token }
        });
        console.log('Get messages response status:', response);
        const body = await response.json();
        console.log('Get messages response:', body);

        expect(response.status).toBe(200);
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        //expect(Array.isArray(body.data)).toBe(true);
    });

    afterEach(async () => {
        await UserTest.delete(users[0].username);
    });
});

describe('POST Message', () => {
    beforeEach(async () => {
        await UserTest.create(users[0].username, users[0].email, users[0].token, users[0].id);
        await UserTest.create(users[1].username, users[1].email, users[1].token, users[1].id);

        await MessageTest.clearAllMessages(users[0].id);
        await MessageTest.clearAllMessages(users[1].id);
    })
    it('should create a new message', async () => {
        const response = await fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': users[0].token
            },
            body: JSON.stringify({
                content: 'Hello, this is a test message!',
                receiverId: users[1].id
            })
        });
        console.log('Post message response status:', response);
        const body = await response.json();
        console.log('Post message response:', body);

        expect(response.status).toBe(200);
        //expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        //expect(body.data.content).toBe('Hello, this is a test message!');
    });
    it('should create a new message and broadcast it', async () => {
        const ws = new WebSocket('ws://localhost:3000/ws');
        await new Promise((resolve) => ws.onopen = resolve);

        let messageReceived = false;
        ws.onmessage = (event) => {
            // Parse pesan JSON yang diterima
            const wsResponse: PaginatedResponse<MessagePublic> = JSON.parse(event.data);
            console.log('Parsed message data:', wsResponse);

            // Assertion detail pesan
            expect(wsResponse.success).toBe(true);
            expect(wsResponse.data?.items).toBeDefined();
            expect(wsResponse.data?.items.length).toBe(1);
            expect(wsResponse.data?.items[0].content).toBe('Hello, this is a test message!');
            expect(wsResponse.data?.items[0].senderId).toBeDefined();
            expect(wsResponse.data?.items[0].receiverId).toBe(users[1].id!);

            messageReceived = true;
            ws.close();
        };

        const response = await fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': users[0].token
            },
            body: JSON.stringify({
                content: 'Hello, this is a test message!',
                receiverId: `${users[1].id}`
            })
        });
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body.data).toBeDefined();
        console.log('Post message response:', body);

        // Tunggu pesan broadcast
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!messageReceived) reject(new Error('No broadcast received'));
                else resolve(null);
            }, 1000);
        });
    });

    afterEach(async () => {
        await UserTest.delete(users[0].username);
        await UserTest.delete(users[1].username);

        await MessageTest.clearAllMessages(users[0].id);
        await MessageTest.clearAllMessages(users[1].id);
    });
});