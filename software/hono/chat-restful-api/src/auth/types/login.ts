import { UserPublic } from "../../user/types/user";
import { TokenPublic } from "./token";


export type LoginRequest = (
    { password: string } & (
        { email: string; username?: never } |
        { username: string; email?: never }
    )
);

export interface LoginResponse {
    // Todo Create a Table for Tokens and then use that here
    // token: TokenPublic;
    token: string;
    user: UserPublic;
}