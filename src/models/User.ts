class User {
    username : string;
    email : string;
    password : string;
    links : string[];

    constructor(username : string, email : string, password : string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.links = ['1','2','3'];

    }
}

export default User;