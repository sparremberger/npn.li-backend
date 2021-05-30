import express, { Request, Response } from "express";
const router = express.Router();

import UserController from "./UserController";
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


router.get("/", async (req: Request, res: Response) => {
    console.log("Get /");
    res.sendFile(path.join(siteDirectory, "index.html")); // Vê bem na hora de upar o server
    console.log("__dirname = " + __dirname);
    await uc.AddNewUser("lepreshaun", "alanrspa@gmail.com", "brbrbr");
    //await uc.findUser("a@a", "a");
    //res.send("kek");
});

router.get("/maluco", (req: Request, res: Response) => {
    uc.findUser('a@a', "a" );
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
});

// LEMBRAR DE FAZER AS ROTAS SEREM ASYNC
router.post("/registro", (req: Request, res: Response) => {
    const { username, email, password, confirmpassword }: any = req.body;
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.email);
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
    //const shortenedUrl: URL | any = UrlShortener(url);
    //console.log("shortenedUrl = " + shortenedUrl.id);
    res.send("POST ték foi");
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});


export default router;