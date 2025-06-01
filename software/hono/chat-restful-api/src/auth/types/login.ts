import { UserPublic } from "../../user/types/user";
import { TokenPublic } from "./token";


export type LoginRequest = (
    { password: string } & (
        { email: string; username?: never } |
        { username: string; email?: never }
    )
);

export interface LoginResponse {
    token: TokenPublic;
    user: UserPublic;
}