import { HTTPException } from "hono/http-exception";
import { UserPublic } from "../types/user";
import { prismaClient } from "src/core/database";
import { ProfilePublic } from "../types/profile";
import { AuthValidation } from "src/auth/validations/auth-validations";
import { ProfileValidation } from "../validation/profile-validation";

export class ProfileService {
    private static userRepository = prismaClient.user;
    private static profileRepository = prismaClient.profile;

    static async getProfile(user: UserPublic): Promise<ProfilePublic> {
        const profile = await this.profileRepository.findFirst({
            where: { userId: user.id },
            include: { user: true }
        });
        if (!profile) throw new HTTPException(404, { message: "Profile not found" });

        return ProfilePublic.fromProfile(profile);
    }
    static async updateProfile(user: UserPublic, req: { firstName: string; lastName: string; avatar?: string }): Promise<ProfilePublic> {
        req = ProfileValidation.PROFILE.parse(req);

        const updatedProfile = await this.profileRepository.update({
            where: { userId: user.id },
            data: {
                firstName: req.firstName,
                lastName: req.lastName,
                // avatar: req.avatar
            },
            include: { user: true }
        });

        return ProfilePublic.fromProfile(updatedProfile);
    }

    static async deleteProfile(user: UserPublic): Promise<void> {
        await this.profileRepository.delete({ where: { userId: user.id } });
    }

}