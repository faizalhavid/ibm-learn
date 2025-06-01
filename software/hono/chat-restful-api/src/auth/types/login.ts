import { UserPublic } from "../../user/types/user";
import { TokenPublic } from "./token";


export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: TokenPublic;
    user: UserPublic;
}