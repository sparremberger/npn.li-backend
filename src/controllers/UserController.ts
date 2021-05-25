import { Request, Response } from "express";

//const User = require("../models/User");

const userSchema = require('../models/UserSchema')




class UserController {
    createNewUser(): any {
        return "kek2";
    }

    findUser(emailString : string): any {
        userSchema.findOne({ email: emailString }, function (err: any, result: any) {
            if (err) {
                console.log(err + `error`);
            } else {
                console.log(result);
            }
        });
        console.log("find user done");

    }
}

export default UserController;
