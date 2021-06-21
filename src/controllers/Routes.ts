// Provavelmente tem muita lógica acontecendo nesse arquivo.

import express, { Request, Response } from "express";
import UserController from "./UserController";
import LinkController from "./LinkController";
import { link } from "fs";

const app = express();
const router = express.Router();
const path = require("path");
const siteDirectory: string = path.join(__dirname, "..", "..", "..", "npn.li", "npn.li");

const uc = new UserController();
const lc = new LinkController();

let options = {
    path:'/*',
    domain:'localhost',
    httpOnly: false,
    maxAge: (1000 * 60 * 60 * 24)
  };

// INÍCIO DAS ROTAS
router.get("/", (req: Request, res: Response) => {
    console.log("Get /");
    res.setHeader('Set-Cookie', 'kek');
    res.sendFile(path.join(siteDirectory, "index.html")); // Vê bem na hora de upar o server
});

router.get("/maluco", async (req: Request, res: Response) => {
    const currentUser = await uc.getUserByEmail("alanrspa@gmail.com");
    console.log(currentUser);
    res.send(currentUser[0].originalUrl[0] + ` ` + currentUser[0].links[0]);
    //res.send(uc.getUser("asd@gmail.com"))
    //res.send(currentUser[0].email + currentUser[0].username + currentUser[0].links.length);
});

// LEMBRAR DE FAZER AS ROTAS SEREM ASYNC
router.post("/registro", async (req: Request, res: Response) => {
    // Desestrutura o req.body. Bom dar uma estudada nisso.
    const { username, email, password, confirmpassword }: any = req.body;
    
    // Deletar, pois é debug.
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.email);

    let resposta: string;
    if (password == confirmpassword) {
        resposta = await uc.AddNewUser(username, email, password);
    } else {
        resposta = "As senhas digitadas não estão iguais";
    }
    console.log(resposta);
    res.send(resposta);
});

router.get("/registro", (req: Request, res: Response) => {
    console.log("Get /registro");
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
});

router.get("/login", (req: Request, res: Response) => {
    console.log("Get /login");
    res.cookie('cookieName', 'cookieValue', options);
    res.sendFile(path.join(siteDirectory, "login.html"));
});

router.post("/login", (req: Request, res: Response) => {
    const { email, password }: any = req.body;
    uc.loginUser(email, password);
    res.send("bó");
    //res.sendFile(path.join(siteDirectory, "login.html"));
});

router.post("/encurtar", async (req: Request, res: Response) => {
    const { url }: any = req.body;
    let doesUrlExist: boolean = await lc.checkIfUrlExists(url);
    if (doesUrlExist == false) {
        let returnedLink = await lc.addLink(url);
        console.log(`Url inserida : ${returnedLink.originalUrl}  Link curto ${returnedLink.link}`);
        res.send({ url : returnedLink.originalUrl, link : returnedLink.link })
    } else {
        let existingLink = await lc.getExistingUrl(url)
        console.log("link não inserido, pois já existe " + existingLink.originalUrl);
        res.send({ url : existingLink.originalUrl, link : existingLink.link });        
    }
    
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});

// Estamos usando até regex agora!
router.get("/:link([a-zA-Z0-9]{4})", async (req: Request, res: Response) => {
    //const currentUser = await uc.getUserByEmail("alanrspa@gmail.com");
    const destinationUrl : string = await lc.getLink(req.params.link);
    res.redirect(destinationUrl);

    // Se não havia nenhum link, então ele não redirecionou ninguém... logo, 404.
    /*if (!redirected) {
        res.send("404");
    }*/

    //console.log("Eita!");
});

export default router;
