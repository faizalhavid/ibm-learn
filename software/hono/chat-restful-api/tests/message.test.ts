import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { MessageTest, usersTest, UserTest } from "./test-utils";
import { PaginatedResponse } from "@/core/types/api-response";
import { MessagePublic } from "@/message/types/message";


describe('GET Message', () => {
    beforeEach(async () => {
        await UserTest.create(usersTest[0]);
    })
    it('should show all user messages', async () => {
        const response = await fetch('http://localhost:3000/messages', {
            method: 'GET',
            headers: { 'Authorization': usersTest[0].token }
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
        await UserTest.delete(usersTest[0].username);
    });
});

describe('POST Message', () => {
    beforeEach(async () => {
        await UserTest.create(usersTest[0]);
        await UserTest.create(usersTest[1]);

        await MessageTest.clearAllMessages(usersTest[0].id);
        await MessageTest.clearAllMessages(usersTest[1].id);
    })
    it('should create a new message', async () => {
        const response = await fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': usersTest[0].token
            },
            body: JSON.stringify({
                content: 'Hello, this is a test message!',
                receiverId: usersTest[1].id
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

    afterEach(async () => {
        await UserTest.delete(usersTest[0].username);
        await UserTest.delete(usersTest[1].username);

        await MessageTest.clearAllMessages(usersTest[0].id);
        await MessageTest.clearAllMessages(usersTest[1].id);
    });
});