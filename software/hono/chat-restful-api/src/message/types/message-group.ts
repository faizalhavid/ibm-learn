import { UserPublic } from "@/user/types/user";
import { MessageGroups } from "../../generated/prisma";
import { MessageGroupMembersPublic } from "./message-group-member";
import { MessagePublic } from "./message";
import { Message, MessageGroupMembers, User } from "@prisma/client";


export interface MessageGroupsRequest {
    name: string;
    //description?: string;
    //isPublic?: boolean;
    members: string[];
}

export interface MessageGroupsPublic extends Omit<MessageGroups, "updatedAt"> {
    owner: UserPublic
    membersCount: number;
    members: MessageGroupMembersPublic[];
    lastMessage?: MessagePublic;
}

export namespace MessageGroupsPublic {
    export function fromPrismaQuery(
        group: MessageGroups & {
            owner: User;
            members: MessageGroupMembersPublic[];
            lastMessage?: Message;
        }
    ): MessageGroupsPublic {
        return {
            ...group,
            membersCount: group.members.length,
            members: group.members,
            owner: UserPublic.fromUser(group.owner),
            lastMessage: group.lastMessage ? MessagePublic.fromMessage(
                group.lastMessage
            ) : undefined

        };
    }
}