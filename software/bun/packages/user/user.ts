export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}