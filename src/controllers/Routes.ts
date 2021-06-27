// Provavelmente tem muita lógica acontecendo nesse arquivo.

import express, { Request, Response } from "express";
import UserController from "./UserController";
import LinkController from "./LinkController";
import { link } from "fs";
import { strict } from "assert/strict";
import { loadavg } from "os";

const app = express();
const router = express.Router();
const path = require("path");

const siteDirectory: string = path.join(__dirname, "..", "..", "..", "npn.li", "npn.li");

const uc = new UserController();
const lc = new LinkController();

let options = {
    path: "/",
    domain: "127.0.0.1",
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 15,
    sameSite: "strict",
};

// INÍCIO DAS ROTAS
router.get("/", (req: Request, res: Response) => {
    console.log("Get /");
    //res.setHeader('Set-Cookie', 'kek');
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

router.get("/userlinks", async (req: Request, res: Response) => {
    const userFound = await uc.AuthenticateUserByToken(req.headers.cookie);
    if (userFound.length > 0) {
        console.log(userFound);
        console.log(userFound[0].links);
        let linkArray = [];
        for (let i = 0; i < userFound[0].links.length; i++) {
            //            await linkArray.push(lc.getLink(userFound[0].links[i]));
            let estringue = await lc.getLink(userFound[0].links[i]);
            linkArray.push({ link : userFound[0].links[i], url : estringue });
            console.log(`Link: ${userFound[0].links[i]} Url: ${linkArray[i]}`);
            
        }
        console.log(linkArray)
        res.json(linkArray);
    } else {
        res.send("404");
    }
});

router.get("/destinations", async (req: Request, res: Response) => {});

router.get("/login", async (req: Request, res: Response) => {
    console.log("Get /login");
    res.sendFile(path.join(siteDirectory, "login.html"));
});

router.post("/login", async (req: Request, res: Response) => {
    const { email, password }: any = req.body;
    let result: string = await uc.loginUser(email, password);
    res.cookie("access_token", result, options); // Seta o cookie para a session token
    res.send(result);
    //res.sendFile(path.join(siteDirectory, "login.html"));
});

router.post("/encurtar", async (req: Request, res: Response) => {
    const { url }: any = req.body;
    let doesUrlExist: boolean = await lc.checkIfUrlExists(url);
    if (doesUrlExist == false) {
        let returnedLink = await lc.addLink(url);
        console.log(`Url inserida : ${returnedLink.originalUrl}  Link curto ${returnedLink.link}`);
        res.send({ url: returnedLink.originalUrl, link: returnedLink.link });
    } else {
        let existingLink = await lc.getExistingUrl(url);
        console.log("link não inserido, pois já existe " + existingLink.originalUrl);
        res.send({ url: existingLink.originalUrl, link: existingLink.link });
    }
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});

// Estamos usando até regex agora!
router.get("/:link([a-zA-Z0-9]{4})", async (req: Request, res: Response) => {
    //const currentUser = await uc.getUserByEmail("alanrspa@gmail.com");
    const destinationUrl: string = await lc.clickLink(req.params.link, true);
    if (destinationUrl != '404') {
    res.redirect(destinationUrl);
    }
    else {
        res.send('404');
    }

    // Se não havia nenhum link, então ele não redirecionou ninguém... logo, 404.
    /*if (!redirected) {
        res.send("404");
    }*/

    //console.log("Eita!");
});

export default router;
