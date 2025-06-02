import { ProfilePublic } from "src/user/types/profile";
import { UserPublic, UserRequest } from "../../user/types/user";
import { TokenPublic } from "./token";


export interface RegisterRequest extends UserRequest { }
export interface RegisterResponse extends UserPublic {
    profile: Omit<ProfilePublic, 'user'>;
}

export namespace RegisterResponse {
    export function fromUserAndProfile(user: UserPublic, profile: Omit<ProfilePublic, 'user'>): RegisterResponse {
        return {
            ...user,
            profile
        };
    }
}