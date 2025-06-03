import { Message } from "../../generated/prisma";

export interface MessageRequest {
    content: string;
    receiverId: string;
}


export interface MessagePublic extends Omit<Message, "updatedAt"> {
}

export namespace MessagePublic {
    export function fromMessage(message: Message): MessagePublic {
        const { id, content, senderId, receiverId, createdAt, deletedAt, isDeleted } = message;
        return { id, content, senderId, receiverId, createdAt, deletedAt, isDeleted };
    }
}