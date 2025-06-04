import { HonoContext } from "@/core/types/hono-context";
import { Hono } from "hono";
import { MessageGroupService } from "../services/message-group-service";
import { BaseApiResponse, PaginatedResponse } from "@/core/types/api-response";
import { MessageGroupsPublic } from "../types/message-group";
import { MessagePublic } from "../types/message";

export const messageGroupsController = new Hono<{ Variables: HonoContext }>();

messageGroupsController.get("/", async (c) => {
    const user = c.get("authenticatedUser");
    const result = await MessageGroupService.getUserGroups(user.id);
    const response: PaginatedResponse<MessageGroupsPublic> = {
        success: true,
        message: "User groups retrieved successfully",
        data: {
            items: result,
            meta: {
                totalItems: result.length,
                totalPages: 1,
                page: 1,
                pageSize: result.length,
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    };
    return c.json(response);
});

messageGroupsController.get("/:id", async (c) => {
    const user = c.get("authenticatedUser");
    const groupId = c.req.param("id");
    const group = await MessageGroupService.getGroupById(groupId, user.id);
    // TODO : Need to handle the case where the group is not found or user is not a member
    // if (!group) {
    //     return c.json({
    //         success: false,
    //         error: {
    //             code: "GROUP_NOT_FOUND",
    //             message: "Group not found or user is not a member"
    //         }
    //     }, 404);
    // }
    const response: BaseApiResponse<MessageGroupsPublic> = {
        success: true,
        message: "Group retrieved successfully",
        data: group,
    };
    return c.json(response);
});

messageGroupsController.post("/", async (c) => {
    const user = c.get("authenticatedUser");
    const request = await c.req.json();
    const result = await MessageGroupService.createMessageGroup(request, user.id);
    const response: BaseApiResponse<MessageGroupsPublic> = {
        success: true,
        message: "Group created successfully",
        data: result,
    };
    return c.json(response);
});

messageGroupsController.patch("/:id", async (c) => {
    const user = c.get("authenticatedUser");
    const groupId = c.req.param("id");
    const request = await c.req.json();
    const result = await MessageGroupService.updateMessageGroup(groupId, request, user.id);
    const response: BaseApiResponse<MessageGroupsPublic> = {
        success: true,
        message: "Group updated successfully",
        data: result,
    };
    return c.json(response);
});

messageGroupsController.delete("/:id", async (c) => {
    const user = c.get("authenticatedUser");
    const groupId = c.req.param("id");
    await MessageGroupService.deleteMessageGroup(groupId, user.id);
    const response: BaseApiResponse = {
        success: true,
        message: "Group deleted successfully",
    };
    return c.json(response);
});

messageGroupsController.get("/:id/messages", async (c) => {
    const user = c.get("authenticatedUser");
    const groupId = c.req.param("id");
    const messages = await MessageGroupService.getMessagesGroup(groupId, user.id);
    const response: PaginatedResponse<MessagePublic> = {
        success: true,
        message: "Messages retrieved successfully",
        data: {
            items: messages,
            meta: {
                totalItems: messages.length,
                totalPages: 1,
                page: 1,
                pageSize: messages.length,
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    };
    return c.json(response);
});

messageGroupsController.post("/:id/messages", async (c) => {
    const user = c.get("authenticatedUser");
    const groupId = c.req.param("id");
    const request = await c.req.json();
    const result = await MessageGroupService.sendMessageToGroup(request, groupId, user.id);
    const response: BaseApiResponse<MessagePublic> = {
        success: true,
        message: "Message sent to group successfully",
        data: result,
    };
    return c.json(response);
});