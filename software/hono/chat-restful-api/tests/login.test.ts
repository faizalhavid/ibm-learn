import { describe, it, expect } from 'bun:test';
import { logger } from 'src/core/logging';


describe('POST LOGIN', () => {
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

