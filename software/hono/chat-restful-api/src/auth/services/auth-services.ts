import { Context } from "hono";
import { LoginRequest, LoginResponse } from "../types/login";
import { AuthValidation } from "../validations/auth-validations";
import { prismaClient } from "../../core/database";
import { HTTPException } from "hono/http-exception";
import { UserPublic } from "../../user/types/user";
import { User } from "../../generated/prisma";
import { RegisterRequest, RegisterResponse } from "../types/register";
import { TokenUsage } from "../types/token";

export class AuthService {
    private static userRepository = prismaClient.user;

    static getProfile(token?: string): Promise<UserPublic | null> {
        if (!token) {
            throw new HTTPException(401, {
                message: "Unauthorized",
            });
        }
        return this.userRepository.findFirst({
            where: {
                token: token
            },
        }).then(user => {
            if (!user) return null;
            const { password, token, ...userPublic } = user;
            return userPublic as UserPublic;
        });
    }

    static async login(req: LoginRequest): Promise<LoginResponse> {
        req = AuthValidation.LOGIN.parse(req);
        let user = await this.userRepository.findFirst({
            where: {
                OR: [
                    { email: req.email },
                    { username: req.username }
                ]
            }
        });
        if (!user) {
            throw new HTTPException(404, {
                message: "User not found",
            });
        }
        const isPasswordValid = await Bun.password.verify(req.password, user.password, 'bcrypt')
        if (!isPasswordValid) {
            throw new HTTPException(401, {
                message: "Invalid credentials",
            });
        }
        const token = crypto.randomUUID();
        user = await this.userRepository.update({
            where: { id: user.id },
            data: { token }
        });

        const response: LoginResponse = {
            token: {
                token,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                userId: user.id,
                usedFor: TokenUsage.Login
            },
            user: user as UserPublic
        };

        return response;
    }

    static async register(req: RegisterRequest): Promise<RegisterResponse> {
        req = AuthValidation.REGISTER.parse(req);

        const existingUser = await this.userRepository.findFirst({
            where: {
                OR: [
                    { email: req.email },
                    { username: req.username }
                ]
            }
        });

        if (existingUser) {
            throw new HTTPException(409, {
                message: "User already exists",
            });
        }

        req.password = await Bun.password.hash(req.password, { algorithm: "bcrypt", cost: 10 });
        const newUser = await this.userRepository.create({
            data: {
                username: req.username,
                email: req.email,
                password: req.password
            }
        });
        return newUser;

    }

    static logout(ctx: Context): string | number {
        return 2;
    }
}
