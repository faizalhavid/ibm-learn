import { Biodata } from "../../generated/prisma";

export interface BiodataRequest {
    gender: string;
    phone: string;
    address: string;
    birthDate: Date;
}

export interface BiodataPublic extends Biodata { }
export namespace BiodataPublic {
    export function fromBiodata(biodata: Biodata): BiodataPublic {
        const {
            id,
            gender,
            phone,
            address,
            birthDate,
            createdAt,
            updatedAt
        } = biodata;
        return {
            id,
            gender,
            phone,
            address,
            birthDate,
            createdAt,
            updatedAt
        };
    }
}
