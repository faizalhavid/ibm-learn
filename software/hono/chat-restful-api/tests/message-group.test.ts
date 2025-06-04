import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { MessageGroupsTest, usersTest, UserTest } from "./test-utils";


describe('Get Message Group', () => {
    beforeEach(async () => {

        await UserTest.create(usersTest[0]);
        await UserTest.create(usersTest[1]);
        await MessageGroupsTest.create({
            id: '1',
            name: 'Test Group',
            ownerId: usersTest[0].id,
            memberIds: [usersTest[0].id, usersTest[1].id],
        });

    })
    it('should return all message groups', async () => {
        const response = await fetch('http://localhost:3000/message-groups', {
            method: 'GET',
            headers: { 'Authorization': usersTest[0].token }
        });
        console.log('Get message groups response status:', response);
        const body = await response.json();
        console.log('Get message groups response:', body);
        expect(response.status).toBe(200);
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        //expect(Array.isArray(body.data)).toBe(true);
    });

    afterEach(async () => {
        await UserTest.delete(usersTest[0].username);
        await UserTest.delete(usersTest[1].username);
        await MessageGroupsTest.clearAllGroups();
    })

});