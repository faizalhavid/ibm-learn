import { prismaClient } from "@/core/database"
import { ProfilePublic } from "@/user/types/profile"

export class UserTest {
    static async create() {
        await prismaClient.user.create({
            data: {
                username: "testuser",
                email: "test@gmail.com",
                password: await Bun.password.hash("pAssword123@", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: "test"
            }
        })
    }

    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "testuser"
            }
        })
    }

}

export class ProfileTest {
    static async create() {
        await prismaClient.profile.create({
            data: {
                firstName: "Test",
                lastName: "User",
                avatar: "https://example.com/avatar.jpg",
                user: {
                    connect: { username: "test" }
                }
            }
        })
    }

    static async delete() {
        await prismaClient.profile.deleteMany({
            where: {
                user: {
                    username: "testuser"
                }
            }
        })
    }

    static async deleteAll() {
        await prismaClient.profile.deleteMany({
            where: {
                user: {
                    username: "testuser"
                }
            }
        })
        await prismaClient.user.deleteMany({
            where: {
                username: "testuser"
            }
        })
    }

    static async get(): Promise<ProfilePublic> {
        const profile = await prismaClient.profile.findFirstOrThrow({
            where: {
                user: {
                    username: "test"
                }
            },
            include: {
                user: true,
            }
        })
        return ProfilePublic.fromProfile(profile);
    }
}
