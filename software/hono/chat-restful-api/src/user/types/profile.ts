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