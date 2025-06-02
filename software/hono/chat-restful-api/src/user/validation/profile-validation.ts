import { z, ZodType } from "zod";


export class ProfileValidation {
    static readonly PROFILE: ZodType = z.object({
        firstName: z.string().min(2).max(100),
        lastName: z.string().min(2).max(100),
        avatar: z.string().url().optional(),
        // image: z.object({
        //     url: z.string().url(),
        //     size: z.number().max(5 * 1024 * 1024), // max 5MB
        //     type: z.string().regex(/^image\/(jpeg|png|gif|webp)$/)
        // }).optional()
    });
}