import { z, ZodType } from "zod";


export const messageSchema = z.object({
    content: z.string().min(1, "Message content is required").max(500, "Message content must not exceed 500 characters"),
    receiverId: z.string().min(1, "User ID is required")
})
    .refine(
        (data) => data.content.trim().length > 0,
        { message: "Message content cannot be empty", path: ["content"] }
    )
    .refine(
        (data) => data.receiverId.trim().length > 0,
        { message: "User ID cannot be empty", path: ["userId"] }
    )
    .refine(
        (data) => data.content.length <= 500,
        { message: "Message content must not exceed 500 characters", path: ["content"] }
    );
