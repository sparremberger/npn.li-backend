import { NextFunction, Request, Response } from "express";

function validateJWT(req : Request, res : Response, next : NextFunction) {
    next();
}