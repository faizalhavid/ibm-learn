import { UserPublic, UserRequest } from "../../user/types/user";
import { TokenPublic } from "./token";


export interface RegisterRequest extends UserRequest { }
export interface RegisterResponse extends UserPublic {
}