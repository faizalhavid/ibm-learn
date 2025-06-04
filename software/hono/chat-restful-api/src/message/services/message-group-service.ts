import { prismaClient } from "@/core/database";



export class MessageGroupService {
    private static messageGroupRepository = prismaClient.messageGroup;
}