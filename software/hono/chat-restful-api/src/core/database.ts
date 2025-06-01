import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({


    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

prismaClient.$on('query', (e: { query: any; params: any; }) => {
    logger.info(`Query: ${e.query} - Params: ${e.params}`);
});

prismaClient.$on('error', (e: { message: any; }) => {
    logger.error(`Error: ${e.message}`);
});

prismaClient.$on('info', (e: { message: any; }) => {
    logger.info(`Info: ${e.message}`);
});

prismaClient.$on('warn', (e: { message: any; }) => {
    logger.warn(`Warning: ${e.message}`);
});