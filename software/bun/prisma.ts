import { PrismaClient } from "./generated/prisma";


const prisma = new PrismaClient();

await prisma.contact.create({
    data: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}).then(contact => {
    console.log("Contact created:", contact);
}).catch(error => {
    console.error("Error creating contact:", error);
}).finally(async () => {
    await prisma.$disconnect();
});