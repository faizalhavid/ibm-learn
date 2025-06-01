import { Hono } from "hono";
import { BaseApiResponse } from "../../core/types/api-response";
import { UserPublic } from "../types/user";


export const userController = new Hono();

userController.get("/", (c) => {
    return c.json({
        success: true,
        message: "User controller is working",
        data: undefined
    } as BaseApiResponse<UserPublic>);
});

userController.get("/:id", (c) => {
    const userId = c.req.param("id");
    return c.json({
        success: true,
        message: `User with ID ${userId} found`,
        data: { id: userId, name: "John Doe" } as UserPublic
    } as BaseApiResponse<UserPublic>);
});



