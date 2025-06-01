import { ChatRoom } from "../../generated/prisma";
import { ChatRoomMemberPublic } from "./chat-room-member";


export interface ChatRoomRequest {
    name: string;
    description?: string;
    //isPublic?: boolean;
    members: string[];
}

export interface ChatRoomPublic extends Omit<ChatRoom, "updatedAt"> {
    membersCount: number;
    lastMessage?: string;
    members: ChatRoomMemberPublic[];
}