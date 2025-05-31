import { describe, it, expect } from "bun:test";
import { User } from "../packages/user/user";

describe("User Package", () => {
    it("should accessed from package user", () => {
        const user = new User("1", "John Doe", "john.doe@example.com");
        expect(user).toBeDefined();
    });
});