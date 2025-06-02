import { Profile } from "../../generated/prisma";
import { BiodataPublic } from "./bio";
import { UserPublic } from "./user";

export interface ProfileRequest {
    firstName: string;
    lastName: string;
    avatar?: string;
}

export interface ProfilePublic extends Omit<Profile, 'userId' | 'bioId'> {
    user: Omit<UserPublic, 'createdAt' | 'updatedAt'>;
    bio?: Omit<BiodataPublic, 'createdAt' | 'updatedAt'>;
}

export namespace ProfilePublic {
    export function fromProfile(profile: Profile & { user: import("../../generated/prisma").User, bio?: BiodataPublic }): ProfilePublic {
        return {
            ...profile,
            user: UserPublic.fromUser(profile.user),
            bio: profile.bio ? BiodataPublic.fromBiodata(profile.bio) : undefined
        };
    }
}