import { User } from "../../generated/prisma";

export type UserRequest = {
    username: string;
    email: string;
    password: string;
};


export interface UserPublic extends Omit<User, 'password' | 'lastLogin' | 'token'> { }