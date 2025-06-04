import { UserPublic } from "@/user/types/user";
import { MessageGroupMembers } from "../../generated/prisma";
import { MessageGroupsPublic } from "./message-group";
import { MessageGroups, User } from "@prisma/client";

export interface MessageGroupMembersRequest {
    chatRoomId: string;
    userId: string;
}

export interface MessageGroupMembersPublic extends Omit<MessageGroupMembers, "updatedAt" | "userId"> {
    user: UserPublic;
}

