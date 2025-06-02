import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { logger } from 'src/core/logging';
import { UserTest } from './test-utils';

describe('POST REGISTER', () => {

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject register when user request is invalid', async () => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser',
                email: 'invalid-email',
                password: 'pAssword123@',
                confirmPassword: 'pAssword123@'
            })
        });

        const body = await response.json();
        logger.debug('Register response:', body);

        expect(response.status).toBe(400);
        expect(body.errors).toBeDefined();
    });

    it('should reject register when user already exists', async () => {
        await UserTest.create();
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'existinguser',
                email: 'johndoe@mail.com',
                password: 'pAssword123@',
                confirmPassword: 'pAssword123@'
            })
        });

        const body = await response.json();
        logger.debug('Register response:', body);

        expect(response.status).toBe(409);
        expect(body.errors).toBeDefined();
        expect(body.errors).toContain('User already exists');
    });

    it('should register a new user successfully', async () => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'test',
                email: 'test@mail.com',
                password: 'pAssword123@',
                confirmPassword: 'pAssword123@',
            })
        });
        const body = await response.json();
        logger.debug('Register response:', body);
        expect(response.status).toBe(201);
        expect(body.data).toBeDefined();
        expect(body.data.username).toBe('test');
        expect(body.data.email).toBe('test@mail.com');
        expect(body.data).toHaveProperty('id');
        expect(body.data).toHaveProperty('createdAt');
        expect(body.data).toHaveProperty('updatedAt');
        expect(body.data).toHaveProperty('password');
        expect(body.data.password).toBeDefined();
        expect(body.data.password).not.toBe('');
        expect(body.data.password).not.toBeNull();
        expect(body.data.password).not.toBeUndefined();

    });
});

describe('POST LOGIN', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should reject login when user email is invalid', async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'juju',
                email: 'juju@mail.com',
                password: 'pAssword123@'
            })
        });

        const body = await response.json();
        logger.debug('Login response:', body);

        expect(response.status).toBe(404);
        expect(body.errors).toBeDefined();
    });

    it('should reject login when user password is invalid', async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser',
                email: 'johndoe@mail.com',
                password: 'invalid-password'
            })
        });
        const body = await response.json();
        logger.debug('Login response:', body);
        expect(response.status).toBe(401);
        expect(body.errors).toBeDefined();
        expect(body.errors).toContain('Invalid credentials');
    });


    it('should reject login when user does not exist', async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'nonexistentuser',
                email: 'nonexistentuser@example.com',
                password: 'pAssword123@'
            })
        });

        const body = await response.json();
        logger.debug('Login response:', body);

        expect(response.status).toBe(404);
        expect(body.errors).toBeDefined();
        expect(body.errors).toContain('User not found');
    });
});

