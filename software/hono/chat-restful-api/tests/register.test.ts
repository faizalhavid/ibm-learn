import { describe, it, expect } from 'bun:test';
import { logger } from 'src/core/logging';



describe('POST REGISTER', () => {
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
                username: 'tomy',
                email: 'tomy@mail.com',
                password: 'pAssword123@',
                confirmPassword: 'pAssword123@',
            })
        });
        const body = await response.json();
        logger.debug('Register response:', body);
        expect(response.status).toBe(201);
        expect(body.data).toBeDefined();
        expect(body.data.username).toBe('tomy');
        expect(body.data.email).toBe('tomy@mail.com');
        expect(body.data).toHaveProperty('id');
        expect(body.data).toHaveProperty('createdAt');
        expect(body.data).toHaveProperty('updatedAt');
        expect(body.data).toHaveProperty('password');
        expect(body.data.password).toBeDefined();
        expect(body.data.password).not.toBe('pAssword123@');
        expect(body.data.password).not.toBe('password123@');
        expect(body.data.password).not.toBe('');
        expect(body.data.password).not.toBeNull();
        expect(body.data.password).not.toBeUndefined();

    });
});
