import { UserPublic } from "@/user/types/user";

export interface HonoContext {
    token: string | null;
    authenticatedUser: UserPublic;
}