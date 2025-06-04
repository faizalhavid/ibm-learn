import { prismaClient } from "@/core/database"
import { WsBroadcastEvent, WsEventName } from "@/core/types/websocket";
import { ProfilePublic } from "@/user/types/profile"
import { randomUUID } from "crypto";
interface UserTestProps {
    id: string;
    username: string;
    email: string;
    token: string;
    password: string;
    profile?: {
        firstName: string;
        lastName: string;
        avatar?: string;
    }
}

const userProfiles: UserTestProps['profile'][] = [
    { firstName: 'Test', lastName: 'User', avatar: 'https://example.com/avatar.jpg' },
    { firstName: 'Test2', lastName: 'User2', avatar: 'https://example.com/avatar2.jpg' }
]


export const usersTest: UserTestProps[] = [
    { id: 'id-test1', username: 'testuser', email: 'test@mail.com', token: 'token-test1', password: 'pAssword123@', profile: userProfiles[0] },
    { id: 'id-test2', username: 'testuser2', email: 'test2@mail.com', token: 'token-test2', password: 'pAssword123@', profile: userProfiles[1] }
]



export function generateWSData(event: WsEventName, data: {},): WsBroadcastEvent {
    return {
        event: event,
        data: data,
        timestamp: Date.now(),
        requestId: randomUUID()
    };
}

export class UserTest {

    static async create(props: UserTestProps) {
        let { id, username, email, token } = props;
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
    static async create(props: UserTestProps = usersTest[0]) {
        const { username, profile } = props;
        if (!profile) {
            throw new Error("Profile data is required to create a profile");
        }
        const { firstName, lastName } = profile;
        await prismaClient.profile.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                avatar: "https://example.com/avatar.jpg",
                user: {
                    connect: { username: username }
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

}

export class MessageTest {
    static async create(props: {
        id: string;
        content: string;
        senderId: string;
        receiverId: string;
    }) {
        const { id, content, senderId, receiverId } = props;
        await prismaClient.message.create({
            data: {
                id: id,
                content: content,
                senderId: senderId,
                receiverId: receiverId
            }
        });
    }
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

export class MessageGroupsTest {
    static async create(props: {
        id: string;
        name: string;
        ownerId: string;
        memberIds: string[];
    }) {
        const { id, name, ownerId, memberIds: members } = props;
        try {
            await prismaClient.messageGroups.create({
                data: {
                    id: id,
                    name: name,
                    ownerId: ownerId,
                    members: {
                        create: members.map(userId => ({
                            user: { connect: { id: userId } }
                        }))
                    }
                }
            });
        } catch (err) {
            console.error('Failed to create message group:', err);
            throw err;
        }
    }

    static async clearAllGroups() {
        await prismaClient.messageGroups.deleteMany({});
    }
}