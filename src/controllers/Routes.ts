/*import { Router } from 'express';
const router = Router();*/
import express, { Request, Response } from "express";
const router = express.Router();

import UserController from "./UserController";
import UrlShortener from "./UrlShortener";
import { URL } from "url";
const app = express();

const path = require("path");
const siteDirectory: string = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "npn.li",
    "npn.li",
);




const uc = new UserController();

router.get('/ok.txt', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "tests.txt"));
});

router.get("/", async (req: Request, res: Response) => {
    console.log("Get /");
    res.sendFile(path.join(siteDirectory, "index.html")); // Vê bem na hora de upar o server
    
    console.log(__dirname);
    //await uc.findUser();
    //res.send("kek");
});

router.get("/maluco", (req: Request, res: Response) => {
    uc.findUser('a@a' );
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
    console.log("Eita! terminou get maluco");
});

router.post("/api", (req: Request, res: Response) => {
    const { username, email, password, confirmpassword }: any = req.body;
    res.send("Eita");
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.confirmpassword);
});

router.post("/registro", (req: Request, res: Response) => {
    const { username, email, password, confirmpassword }: any = req.body;
    console.log(req.body);
    
    /*if (password == confirmpassword) {
        const newUser = new User({
            username: username,
            email: email,
            password: password,
        });
        newUser.save(function (error: any, document: any) {
            if (error) console.error(error);
            console.log(document);
        });
    }*/
    res.send("POSTed registro");
});

router.get("/registro", (req: Request, res: Response) => {
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
    console.log("Eita!");
});

router.post("/encurtar", (req: Request, res: Response) => {
    const { url }: any = req.body;
    console.log(url);
    const shortenedUrl: URL | any = UrlShortener(url);
    console.log("shortenedUrl = " + shortenedUrl.id);
    res.send("POST ték foi");
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});

//app.use(express.static(siteDirectory));

export default router;