

const passwordHash = await Bun.password.hash("Barakadut123@", {
    algorithm: "bcrypt",
    cost: 10,
});

const result = await Bun.password.verify("Barakadut123@", passwordHash, "bcrypt");
const failResult = await Bun.password.verify("WrongPassword", passwordHash, "bcrypt");
console.log("Password hash:", passwordHash);
console.log("Password verification result:", result); // true if the password matches
console.log("Password verification failed result:", failResult); // false if the password does not match