import { Biodata } from "../../generated/prisma";

export interface BiodataRequest {
    gender: string;
    phone: string;
    address: string;
    birthDate: Date;
}

export interface BiodataPublic extends Biodata { }