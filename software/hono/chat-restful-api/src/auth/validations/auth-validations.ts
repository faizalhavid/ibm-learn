import { z, ZodType } from "zod";


export class AuthValidation {

    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(3).max(20).optional(),
        password: z.string().min(6).max(50).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
        confirmPassword: z.string().min(6).max(50).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
        email: z.string().email().max(100).optional()
    })
        .refine(
            (data) => !!data.username || !!data.email,
            { message: "Either username or email is required", path: ["username", "email"] }
        )
        .refine(
            (data) => data.password === data.confirmPassword,
            { message: "Passwords do not match", path: ["confirmPassword"] }
        );

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(3).max(20).optional(),
        password: z.string().min(6).max(50),
        email: z.string().email().max(100).optional()
    }).refine(
        (data) => !!data.username || !!data.email,
        { message: "Either username or email is required", path: ["username", "email"] }
    );

    static readonly LOGOUT: ZodType = z.object({
        token: z.string().min(1, "Token is required")
    });

    static readonly TOKEN: ZodType = z.string().min(1, "Token is required");
}