import { prismaClient } from "@/core/database"
import { ProfilePublic } from "@/user/types/profile"

export class UserTest {
    static delete2() {
        throw new Error("Method not implemented.")
    }
    static async create(username: string, email: string, token: string, id?: string) {
        if (!id) {
            id = crypto.randomUUID();
        }
        await prismaClient.user.create({
            data: {
                id: id,
                username: username,
                email: email,
                password: await Bun.password.hash("pAssword123@", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: token
            }
        })
    }


    static async delete(username: string) {
        await prismaClient.user.deleteMany({
            where: {
                username: username
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
                    connect: { username: "testuser" }
                }
            }
        })
    }

    static async delete(username: string) {
        await prismaClient.profile.deleteMany({
            where: {
                user: {
                    username: username
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

export class MessageTest {
    static async clearAllMessages(userId: string) {
        await prismaClient.message.deleteMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            }
        });
    }
}
