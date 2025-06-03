import app, { server } from "@/index";
import { Hono } from "hono";
import { MessageService } from "../services/message-service";
import { BaseApiResponse, PaginatedResponse } from "@/core/types/api-response";
import { MessagePublic } from "../types/message";
import { HonoContext } from "@/core/types/hono-context";

export const messagesController = new Hono<{ Variables: HonoContext }>();

messagesController.get("/", async (c) => {
    const user = c.get("authenticatedUser");
    const messages = await MessageService.getMessages(user);

    const page = 1;
    const pageSize = messages.length;
    const totalItems = messages.length;
    const totalPages = 1;

    const paginationResponse: PaginatedResponse<MessagePublic> = {
        success: true,
        message: "Messages retrieved successfully",
        data: {
            items: messages,
            meta: {
                totalItems,
                totalPages,
                page,
                pageSize,
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    };
    return c.json(paginationResponse);
});


messagesController.post("/", async (c) => {
    const user = c.get("authenticatedUser");
    const request = await c.req.json();
    const result = await MessageService.sendMessage(request, user.id);

    const broadcastResponse: PaginatedResponse<MessagePublic> = {
        success: true,
        message: "Get messages successfully",
        data: {
            items: [result],
            meta: {
                totalItems: 1,
                totalPages: 1,
                page: 1,
                pageSize: 1,
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    };

    const response: BaseApiResponse = {
        success: true,
        message: "Message sent successfully",
        data: result,
    };
    server.publish("messages", JSON.stringify(broadcastResponse));
    return c.json(response);
});
