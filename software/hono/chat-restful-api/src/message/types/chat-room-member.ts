import { ChatRoomMember } from "../../generated/prisma";
import { ChatRoomPublic } from "./chat-room";

export interface ChatRoomMemberRequest {
    chatRoomId: string;
    userId: string;
}

export interface ChatRoomMemberPublic extends Omit<ChatRoomMember, "updatedAt" | "chatRoomId"> {
    chatRoom: Omit<ChatRoomPublic, "members">;
}