import { UserPublic } from "@/user/types/user";
import { MessageGroupMembers } from "../../generated/prisma";
import { MessageGroupsPublic } from "./message-groups";
import { MessageGroups, User } from "@prisma/client";

export interface MessageGroupMembersRequest {
    messageGroupId: string;
    userId: string;
}

export interface MessageGroupMembersPublic extends Omit<MessageGroupMembers, "updatedAt" | "userId"> {
    user: Omit<UserPublic, "createdAt" | "updatedAt" | "deletedAt" | "isDeleted" | "isActive">;
}

export namespace MessageGroupMembersPublic {
    export function fromPrismaQuery(
        member: MessageGroupMembers & { user: User }
    ): MessageGroupMembersPublic {
        const { id, username, email } = UserPublic.fromUser(member.user);
        return {
            id: member.id,
            createdAt: member.createdAt,
            messageGroupId: member.messageGroupId,
            user: { id, username, email },
            isDeleted: member.isDeleted,
            deletedAt: member.deletedAt,
        };
    }
}