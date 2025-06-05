import { UserPublic } from "@/user/types/user";
import { MessagePublic } from "./message";
import { Message, MessageGroupMessages } from "@/generated/prisma";



export interface MessageGroupsMessagesPublic extends Omit<MessageGroupMessages, "messageId" | "updatedAt"> {
    message: MessagePublic;
}

export namespace MessageGroupsMessagesPublic {
    export function fromMessageGroupMessages(
        messageGroupMessages: MessageGroupMessages &
        { message: Message }):
        MessageGroupsMessagesPublic {
        return {
            ...messageGroupMessages,
            message: MessagePublic.fromMessage(messageGroupMessages.message),
        };
    }
}