import { testString } from "../functions"
import { describe, it, expect } from 'bun:test';


describe('Function Tests', () => {
    it('should return true for a valid function', () => {
        const response = testString('John');
        expect(response).toBe('Hello, John!');
    }
    );
});