import { Request, Response } from "express";
import User from "../models/User";
//const User = require("../models/User");

const userSchema = require("../models/UserSchema");

class UserController {
    createNewUser(): any {
        return "kek2";
    }

    AddNewUser(username: string, email: string, password: string): User {
        // descobre se um usuário com mesmo nome OU mesmo e-mail já está na DB
        // se qualquer um dos dois, retorna erro avisando, caso contrário...

        const usuarioCriado: User = new User(username, email, password);

        return new User("1", "s", "q");
    }

    async findUser(emailParam: string, usernameParam: string): Promise<boolean> {
        //console.log(userSchema.findOne({emailString}));
        let emailFound: boolean = false;
        let userNameFound: boolean;
        await userSchema.find({ email: emailParam }, function (err: any, result: any) {
            if (err) {
                emailFound = false;
                console.log(err + `error`);
            } else {
                if (result.length > 0) {
                    emailFound = true;
                    console.log("finduser email found... emailFound = " + emailFound.toString());
                    console.log(result);
                } else {
                    emailFound = false;
                    console.log("finduser email not found... emailFound = " + emailFound.toString());
                }
            }
        });


        try {
            console.log("entrou no try");
            if (emailFound) {

            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default UserController;
