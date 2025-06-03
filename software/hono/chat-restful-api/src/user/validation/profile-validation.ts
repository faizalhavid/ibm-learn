import { z, ZodObject, ZodRawShape, ZodType } from "zod";


export class ProfileValidation {
    static readonly PROFILE: ZodObject<ZodRawShape> = z.object({
        firstName: z.string().min(2).max(100),
        lastName: z.string().min(2).max(100),
        //avatar: z.string().url().optional(),
    });
}