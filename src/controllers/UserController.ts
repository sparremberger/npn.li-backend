import { Request, Response } from "express";

const User = require('../models/User');

function findUser(user : any, req : Request, res : Response) {
    User.findOne({ email: "a@a" }, function (err: any, result: any) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
        }
    }).lean();
}

