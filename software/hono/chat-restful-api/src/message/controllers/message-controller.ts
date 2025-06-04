import app, { server } from "@/index";
import { Hono } from "hono";
import { MessageService } from "../services/message-service";
import { BaseApiResponse, PaginatedResponse } from "@/core/types/api-response";
import { MessagePublic } from "../types/message";
import { HonoContext } from "@/core/types/hono-context";
import { WsBroadcastEvent, WsEventName } from "@/core/types/websocket-event";
import { randomUUID } from "crypto";

export const messagesController = new Hono<{ Variables: HonoContext }>();
const topic = "messages";
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

    const broadcastPayload: WsBroadcastEvent<MessagePublic> = generateWSBroadcastPayload(result, WsEventName.MessageCreated);

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

    await MessageService.deleteMessage(messageId, user.id);

    server.publish("messages", JSON.stringify({
        event: "messageDeleted",
        data: { messageId, userId: user.id }
    }));

    const response: BaseApiResponse = {
        success: true,
        message: "Message deleted successfully",
        data: null,
    };
    return c.json(response);
})

function generateWSBroadcastPayload(
    data: MessagePublic,
    event: WsEventName
): WsBroadcastEvent<MessagePublic> {
    return {
        event: event,
        timestamp: Date.now(),
        senderId: data.senderId,
        data: data,
        requestId: randomUUID(),
    };
}
