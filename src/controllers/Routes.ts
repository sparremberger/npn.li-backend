import express, { Request, Response } from "express";

const router = express.Router();

import UserController from "./UserController";
import LinkController from "./LinkController";
const app = express();

const path = require("path");
const siteDirectory: string = path.join(__dirname, "..", "..", "..", "npn.li", "npn.li");

const uc = new UserController();
const lc = new LinkController();

// INÍCIO DAS ROTAS
router.get("/", (req: Request, res: Response) => {
    console.log("Get /");
    res.sendFile(path.join(siteDirectory, "index.html")); // Vê bem na hora de upar o server
    console.log("__dirname = " + __dirname);

    //await uc.findUser("a@a", "a");
    //res.send("kek");
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
    const { username, email, password, confirmpassword }: any = req.body;
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.email);
    let resposta: string;
    if (password == confirmpassword) {
        resposta = await uc.AddNewUser(req.body.username, req.body.email, req.body.password);
    } else {
        resposta = "As senhas digitadas não estão iguais";
    }
    console.log(resposta);
    res.send(resposta);
});

router.get("/registro", (req: Request, res: Response) => {
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
});

router.get("/login", (req: Request, res : Response) => {
    res.sendFile(path.join(siteDirectory, "login.html"));
});

router.post("/encurtar", async (req: Request, res: Response) => {
    const { url }: any = req.body;
    let doesUrlExist: boolean = await lc.checkIfUrlExists(url);
    if (doesUrlExist == false) {
        await lc.addLink(url);
        console.log("link inserido");
    } else {
        console.log("link não inserido");
    }
    res.send("POST ték foi");
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});

// Estamos usando até regex agora!
router.get("/:link([a-zA-Z0-9]{4})", async (req: Request, res: Response) => {
    const currentUser = await uc.getUserByEmail("alanrspa@gmail.com");
    let redirected: boolean = false;

    // Confere no array se existe um link com o parametro inserido,
    for (let i = 0; i < currentUser[0].links.length; i++) {
        if (currentUser[0].links[i] == req.params.link) {
            redirected = true;
            res.redirect(`http://${currentUser[0].originalUrl[i]}`);
        }
    }

    // Se não havia nenhum link, então ele não redirecionou ninguém... logo, 404.
    if (!redirected) {
        res.send("404");
    }

    //console.log("Eita!");
});

export default router;
