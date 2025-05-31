import { describe, it, expect } from "bun:test";

describe("Web Fetch API", () => {
    it("should fetch data from a URL", async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        expect(response.ok).toBe(true);
        const data = await response.json();
        expect(data).toHaveProperty("id", 1);
    });

    it("should handle non-200 responses", async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/9999");
        expect(response.ok).toBe(false);
        expect(response.status).toBe(404);
    });
});