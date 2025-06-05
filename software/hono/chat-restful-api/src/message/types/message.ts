import { Message, MessageGroupMessages } from "../../generated/prisma";
import { MessageGroupsPublic } from "./message-groups";

export interface MessageRequest {
    content: string;
    receiverId: string;
}


export interface MessagePublic extends Omit<Message, "updatedAt"> {
}

export namespace MessagePublic {
    export function fromMessage(message: Message): MessagePublic {
        return { id: message.id, content: message.content, senderId: message.senderId, receiverId: message.receiverId, createdAt: message.createdAt, isDeletedBySender: message.isDeletedBySender, isDeletedByReceiver: message.isDeletedByReceiver };
    }
}

export interface MessageGroupsMessagesRequest {
    message: MessageRequest;
}

