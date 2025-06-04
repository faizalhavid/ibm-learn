import { prismaClient } from "@/core/database";
import { PaginatedResponse } from "@/core/types/api-response";
import { MessageGroupsMessagesRequest, MessagePublic } from "../types/message";
import { MessageGroupsPublic, MessageGroupsRequest } from "../types/message-group";
import { messageGroupsSchema, messageSchema } from "../message-validations";
import { Message } from "@prisma/client";



export class MessageGroupService {
    private static messageGroupRepository = prismaClient.messageGroups;
    private static messageGroupMessagesRepository = prismaClient.messageGroupMessages;
    private static groupMemberRepository = prismaClient.messageGroupMembers;
    private static messageRepository = prismaClient.message;

    static async getUserGroups(userId: string): Promise<MessageGroupsPublic[]> {
        const groups = await this.messageGroupRepository.findMany({
            where: {
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                owner: true,
                members: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return groups.map(group => MessageGroupsPublic.fromPrismaQuery(group));
    }

    static async getGroupById(groupId: string, userId: string): Promise<MessageGroupsPublic> {
        const group = await this.messageGroupRepository.findFirst({
            where: {
                id: groupId,
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                owner: true,
                members: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!group) {
            throw new Error("Group not found or user is not a member");
        }
        return MessageGroupsPublic.fromPrismaQuery(group);
    }

    static async createMessageGroup(req: MessageGroupsRequest, userId: string) {
        req = messageGroupsSchema.parse(req);
        const members = await this.groupMemberRepository.findMany({
            where: {
                userId: { in: req.members },
            },
            include: {
                user: true,
            },
        });

        if (members.length !== req.members.length) {
            throw new Error("Some members not found");
        }

        const group = await this.messageGroupRepository.create({
            data: {
                name: req.name,
                //description: data.description,
                ownerId: userId,
                members: {
                    create: members.map(member => ({
                        userId: member.userId,
                    })),
                },
            },
            include: {
                owner: true,
                members: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return MessageGroupsPublic.fromPrismaQuery(group);
    }

    static async updateMessageGroup(groupId: string, req: Partial<MessageGroupsRequest>, userId: string): Promise<MessageGroupsPublic> {
        req = messageGroupsSchema.partial().parse(req);
        const group = await this.messageGroupRepository.findFirst({
            where: {
                id: groupId,
                ownerId: userId,
            },
            include: {
                owner: true,
                members: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!group) {
            throw new Error("Group not found or user is not the owner");
        }
        const updatedGroup = await this.messageGroupRepository.update({
            where: { id: groupId },
            data: {
                name: req.name ?? group.name,
                //description: req.description ?? group.description,
            },
            include: {
                owner: true,
                members: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return MessageGroupsPublic.fromPrismaQuery(updatedGroup);
    }
    static async deleteMessageGroup(groupId: string, userId: string): Promise<void> {
        const group = await this.messageGroupRepository.findFirst({
            where: {
                id: groupId,
                ownerId: userId,
            },
        });
        if (!group) {
            throw new Error("Group not found or user is not the owner");
        }
        await this.messageGroupRepository.delete({
            where: { id: groupId },
        });
    }

    static async getMessagesGroup(groupId: string, userId: string): Promise<MessagePublic[]> {
        const group = await this.messageGroupRepository.findFirst({
            where: {
                id: groupId,
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
        });
        if (!group) {
            throw new Error("Group not found or user is not a member");
        }
        const messages = await this.messageGroupMessagesRepository.findMany({
            where: {
                id: groupId,
            },
            orderBy: {
                createdAt: "asc",
            },
            include: {
                message: true,
            },
        }) as unknown as Message[];

        return messages.map(msg => MessagePublic.fromMessage(msg));
    }

    static async sendMessageToGroup(req: MessageGroupsMessagesRequest, groupId: string, userId: string): Promise<MessagePublic> {
        req.message = messageSchema.parse(req.message);

        const group = await this.messageGroupRepository.findFirst({
            where: {
                id: groupId,
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                members: true,
            },
        });
        if (!group) {
            throw new Error("Group not found or user is not a member");
        }
        const message = await this.messageRepository.create({
            data: {
                ...req.message,
                senderId: userId,
            },
        });
        const messageData = await this.messageGroupMessagesRepository.create({
            data: {
                messageId: message.id,
                messageGroupId: group.id,
            },
            include: {
                message: true,
            },
        });
        return MessagePublic.fromMessage(messageData.message);

    }
}