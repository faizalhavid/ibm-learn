import { Message } from "../../generated/prisma";

export interface MessageRequest {
    content: string;
    senderId: string;
    receiverId: string;
}


export interface MessagePublic extends Omit<Message, "updatedAt"> {
}