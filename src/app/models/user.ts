export class User {

    uid?: string;
    name: string;
    email: string;

    constructor(name: string, email: string, uid?: string) {
        this.uid = uid;
        this.name = name;
        this.email = email;
    }

    static firestoreUser({ name, email, uid }) {
        return new User(name, email, uid);
    }
}