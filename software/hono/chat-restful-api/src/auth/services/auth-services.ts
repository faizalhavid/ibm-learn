import { Context } from "hono";
import { LoginRequest, LoginResponse } from "../types/login";
import { AuthValidation } from "../validations/auth-validations";
import { prismaClient } from "../../core/database";
import { HTTPException } from "hono/http-exception";
import { BaseApiResponse, ErrorResponse } from "../../core/types/api-response";
import { UserPublic } from "../../user/types/user";
import { User } from "../../generated/prisma";
import { ApiErrorResponse } from "../../core/exceptions/ApiErrorResponse";

export class AuthService {
    private userRepository = prismaClient.user;

    async login(req: LoginRequest): Promise<BaseApiResponse<LoginResponse>> {
        req = AuthValidation.LOGIN.parse(req);
        this.userRepository.findUnique({
            where: {
                OR: [
                    { email: req.email },
                    { username: req.username }
                ]
            }
        }).then((user: User) => {
            if (!user) {
                throw new HTTPException(404, {
                    res: Response.json(
                        new ApiErrorResponse(
                            400,
                            "User not found",
                            { email: req.email, username: req.username }
                        ),
                        { status: 404 }
                    )
                });
            }
            if (user.password !== req.password) {
                throw new HTTPException(401, {
                    res: Response.json(
                        new ApiErrorResponse(
                            401,
                            "Invalid credentials",
                            { email: req.email, username: req.username }
                        ),
                        { status: 401 }
                    )
                });
            }

        })
        throw new Error("Invalid credentials");
    }

    async register(username: string, password: string, email: string) {
        return { id: "user-id", username, email };
    }

    async logout(ctx: Context) {
        return { success: true };
    }
}