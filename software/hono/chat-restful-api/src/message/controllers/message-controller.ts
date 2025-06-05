import app, { server } from "@/index";
import { Hono } from "hono";
import { MessageService } from "../services/message-service";
import { BaseApiResponse, PaginatedResponse } from "@/core/types/api-response";
import { MessagePublic } from "../types/message";
import { HonoContext } from "@/core/types/hono-context";
import { WsBroadcastEvent, WsEventName } from "@/core/types/websocket";
import { randomUUID } from "crypto";

export const messagesController = new Hono<{ Variables: HonoContext }>();
const topic = "messages";


messagesController.get("/", async (c) => {
    const user = c.get("authenticatedUser");
    const messages = await MessageService.getMessages(user.id);

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

messagesController.get("/:id", async (c) => {
    const user = c.get("authenticatedUser");
    const messageId = c.req.param("id");
    const message = await MessageService.getMessageById(messageId, user.id);

    const response: BaseApiResponse = {
        success: true,
        message: "Message retrieved successfully",
        data: message,
    };
    return c.json(response);
});

messagesController.post("/", async (c) => {
    const user = c.get("authenticatedUser");

    const request = await c.req.json();
    const result = await MessageService.sendMessage(request, user.id);

    const broadcastPayload = generateWSBroadcastPayload<MessagePublic>(result, WsEventName.MessageCreated);

    const response: BaseApiResponse = {
        success: true,
        message: "Message sent successfully",
        data: result,
    };
    server.publish(topic, JSON.stringify(broadcastPayload));
    return c.json(response);
});

messagesController.delete("/:id", async (c) => {
    const user = c.get("authenticatedUser");
    const messageId = c.req.param("id");
    const broadcastPayload = generateWSBroadcastPayload<{ messageId: string; userId: string }>(
        { messageId, userId: user.id },
        WsEventName.MessageDeleted
    );
    await MessageService.deleteMessage(messageId, user.id);

    server.publish(topic, JSON.stringify(broadcastPayload));

    const response: BaseApiResponse = {
        success: true,
        message: "Message deleted successfully",
        data: null,
    };
    return c.json(response);
})

function generateWSBroadcastPayload<T>(
    data: T,
    event: WsEventName
): WsBroadcastEvent<T> {
    // @ts-ignore
    return {
        event: event,
        timestamp: Date.now(),
        // @ts-ignore
        senderId: (data as any).senderId,
        data: data,
        requestId: randomUUID(),
    };
}
