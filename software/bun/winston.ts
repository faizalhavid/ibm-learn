import winston, { log } from "winston";

const logger = winston.createLogger({
    format: winston.format.json(),
    level: "debug",
    transports: [
        new winston.transports.Console(),

        new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    ],
});


logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug("This is a debug message");