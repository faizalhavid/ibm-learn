import { Hono } from "hono";


export const userController = new Hono();

userController.get("/", (c) => {
    return c.json({
        message: "User controller is working",
    });
});