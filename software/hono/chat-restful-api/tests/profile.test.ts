import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { ProfileTest, UserTest } from './test-utils';

describe('POST / PATCH PROFILE', () => {
    beforeEach(async () => {
        await ProfileTest.deleteAll();
        await UserTest.create();
    })

    afterEach(async () => {
        await ProfileTest.deleteAll();
        await UserTest.delete();
    })

    it('should rejected if token is not provided', async () => {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const body = await response.json();
        expect(response.status).toBe(401);
        expect(body.errors).toBeDefined();
        expect(body.errors).toContain('Unauthorized');
    });
    it('should rejected if update profile is invalid', async () => {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PATCH',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                firstName: ''
            })
        });

        const body = await response.json();
        expect(response.status).toBe(400);
        expect(body.errors).toBeDefined();
        expect(body.errors).toContain('Invalid input');
    });

    it('should success if profile is valid (only firstname)', async () => {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PATCH',
            headers: {
                'Authorization': 'test',
            },
            body: JSON.stringify({
                firstName: 'John'
            })
        });
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe('John');
        expect(body.data.lastName).toBeNull();
        expect(body.data.avatar).toBeNull();
        expect(body.data.user).toBeDefined();
    });

    it('should success if profile is valid (all fields)', async () => {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PATCH',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                firstName: 'John',
                lastName: 'Doe',
                // avatar: 'https://example.com/avatar.jpg'
            })
        });
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe('John');
        expect(body.data.lastName).toBe('Doe');
        expect(body.data.avatar).toBeNull(); // Avatar is optional
        expect(body.data.user).toBeDefined();

    });
});

describe('GET PROFILE', () => {
    beforeEach(async () => {
        await ProfileTest.deleteAll();
        await UserTest.create();
        await ProfileTest.create();
    })

    afterEach(async () => {
        await ProfileTest.deleteAll();
        await UserTest.delete();
    })

    it('should return profile data', async () => {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'test'
            }
        });

        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe('John');
        expect(body.data.lastName).toBe('Doe');
        expect(body.data.avatar).toBeNull();
        expect(body.data.user).toBeDefined();
    });
});
