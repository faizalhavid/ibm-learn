import { UserPublic } from "@/user/types/user";
import { MessageGroups } from "../../generated/prisma";
import { MessageGroupMembersPublic } from "./message-groups-member";
import { MessagePublic } from "./message";
import { Message, MessageGroupMembers, User } from "@prisma/client";


export interface MessageGroupsRequest {
    name: string;
    //description?: string;
    //isPublic?: boolean;
    members: string[];
}

type MemberUserType = Omit<UserPublic, "createdAt" | "updatedAt" | "deletedAt" | "isDeleted" | "isActive">;

export interface MessageGroupsPublic extends Omit<MessageGroups, "updatedAt" | "ownerId"> {
    owner: MemberUserType;
    membersCount: number;
    members: MessageGroupMembersPublic[];
    lastMessage?: MessagePublic;
}

export namespace MessageGroupsPublic {
    export function fromPrismaQuery(
        group: MessageGroups & {
            owner: User;
            members: (MessageGroupMembers & { user: User })[]; // <-- perbaiki di sini
            lastMessage?: Message;
        }
    ): MessageGroupsPublic {
        const toMemberUserType = (user: User): MemberUserType => {
            const { id, username, email } = UserPublic.fromUser(user);
            return { id, username, email };
        };
        return {
            id: group.id,
            name: group.name,
            createdAt: group.createdAt,
            deletedAt: group.deletedAt,
            isDeleted: group.isDeleted,
            membersCount: group.members.length,
            owner: toMemberUserType(group.owner),
            members: group.members.map(member => ({
                ...MessageGroupMembersPublic.fromPrismaQuery(member),
                user: toMemberUserType(member.user)
            })),
            lastMessage: group.lastMessage ? MessagePublic.fromMessage(group.lastMessage) : undefined
        };
    }
}