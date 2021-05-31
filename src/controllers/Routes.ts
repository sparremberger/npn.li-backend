import express, { Request, Response } from "express";
const router = express.Router();

import UserController from "./UserController";
const app = express();

const path = require("path");
const siteDirectory: string = path.join(__dirname, "..", "..", "..", "npn.li", "npn.li");

const uc = new UserController();

router.get("/", (req: Request, res: Response) => {
    console.log("Get /");
    res.sendFile(path.join(siteDirectory, "index.html")); // Vê bem na hora de upar o server
    console.log("__dirname = " + __dirname);

    //await uc.findUser("a@a", "a");
    //res.send("kek");
});

router.get("/maluco", async (req: Request, res: Response) => {
    /*console.log(uc.getUser("asd@gmail.com").then((user) => {
        console.log(user);
    }));*/
    
    console.log(await uc.getUser("a@a"));
    //res.send(uc.getUser("asd@gmail.com"))
    
});

// LEMBRAR DE FAZER AS ROTAS SEREM ASYNC
router.post("/registro", async (req: Request, res: Response) => {
    const { username, email, password, confirmpassword }: any = req.body;
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.email);
    let resposta : string;
    if (password == confirmpassword) {
        resposta = await uc.AddNewUser(req.body.username, req.body.email, req.body.password);
    }
    else {
        resposta = "As senhas digitadas não estão iguais";
    }
    console.log(resposta);
    res.send(resposta);
});

router.get("/registro", (req: Request, res: Response) => {
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
    console.log("Eita!");
});

router.post("/encurtar", (req: Request, res: Response) => {
    const { url }: any = req.body;
    console.log(url);
    //const shortenedUrl: URL | any = UrlShortener(url);
    //console.log("shortenedUrl = " + shortenedUrl.id);
    res.send("POST ték foi");
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});

export default router;
