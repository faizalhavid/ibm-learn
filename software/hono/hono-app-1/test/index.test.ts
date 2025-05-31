import { describe, expect, it } from "bun:test";
import app from "../src";


describe("Application", () => {
    it("Get /hello/:name", async () => {
        const res = await app.request("/hello/jocko", {
            method: "Get"
        })
        // pass expect
        expect(await res.text()).toBe("Hello jocko!")
        // fail expect
        expect(await res.text()).toBe("Hello huwani!")
    })
})