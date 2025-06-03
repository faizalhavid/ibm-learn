import { HTTPException } from "hono/http-exception";
import { prismaClient } from "src/core/database";
import { UserPublic } from "../types/user";
import { AuthValidation } from "src/auth/validations/auth-validations";

export class UserService {
    private static userRepository = prismaClient.user;

    static async getUser(token?: string): Promise<UserPublic> {
        console.log("Fetching user with token:", token);
        const parsedToken = AuthValidation.TOKEN.parse(token);
        const user = await this.userRepository.findFirst({ where: { token: parsedToken } });
        if (!user) throw new HTTPException(403, { message: "Invalid token or user not found" });
        return UserPublic.fromUser(user);
    }
    // static async updateUser(token: string, req: { firstName: string; lastName: string; avatar?: string }): Promise<UserPublic> {
    //     const parsedToken = AuthValidation.TOKEN.parse(token);
    //     req = UserValidation.PROFILE.parse(req);

    //     const user = await this.userRepository.findFirst({ where: { token: parsedToken } });
    //     if (!user) throw new HTTPException(403, { message: "Invalid token or user not found" });

    //     const updatedUser = await this.userRepository.update({
    //         where: { id: user.id },
    //         data: {
    //             firstName: req.firstName,
    //             lastName: req.lastName,
    //             avatar: req.avatar
    //         },
    //         include: { user: true }
    //     });

    //     return UserPublic.fromUser(updatedUser);
    // }

    // static async deleteUser(token: string): Promise<void> {
    //     const parsedToken = AuthValidation.TOKEN.parse(token);
    //     const user = await this.userRepository.findFirst({ where: { token: parsedToken } });
    //     if (!user) throw new HTTPException(403, { message: "Invalid token or user not found" });

    //     await this.userRepository.delete({ where: { userId: user.id } });
    // }

}