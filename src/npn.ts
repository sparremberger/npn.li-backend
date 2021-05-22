import express, { Request, Response } from "express";
import { URL } from "url";
import UrlShortener from "./controllers/UrlShortener";

const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/users";
const User = require("./models/User");

const path = require("path");
const app = express();
const port = 3000;
const siteDirectory: string = path.join(
    __dirname,
    "..",
    "..",
    "npn.li",
    "npn.li"
);
const listaDeURLS: Array<URL> = [];

// Serve pra ler o req.body quando vem do form html
app.use(express.urlencoded({ extended: false }));
// Serve para ler o req.body quando parte de um json
app.use(express.json());

// Conecta com o mongodb usando a url lá de cima
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// db vai ser usado para monitorar a conexão
const db = mongoose.connection;

db.once("open", (_: any) => {
    console.log("Database connected:", url);
});

db.on("error", (err: any) => {
    console.error("connection error:", err);
});

app.get("/", (req: Request, res: Response) => {
    console.log("Get /");
    console.log(__dirname); // C:\Users\Sparremberger\Desktop\GitHub\npn.li-backend\dist
    res.sendFile(path.join(siteDirectory, "index.html")); // Vê bem na hora de upar o server
    console.log(siteDirectory);
    //res.send("kek");
});

app.post("/api", (req: Request, res: Response) => {
    const { username, email, password, confirmpassword }: any = req.body;
    res.send("Eita");
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.confirmpassword);
});

app.post("/registro", (req: Request, res: Response) => {
    const { username, email, password, confirmpassword }: any = req.body;
    console.log(req.body);
    if (password == confirmpassword) {
        const newUser = new User({
            username: username,
            email: email,
            password: password,
        });
        newUser.save(function (error: any, document: any) {
            if (error) console.error(error);
            console.log(document);
        });
    }
    res.send("POSTed registro");
});

app.get("/registro", (req: Request, res: Response) => {
    const usuarioEncontrado = User.find({ email: "a@a" }).lean();

    // É inacreditável que um simples find precise de tudo isso de código. Deve haver um jeito melhor.
    User.findOne({ email: "a@a" }, function (err: any, result: any) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
        }
    }).lean();
    res.sendFile(path.join(siteDirectory, "cadastro.html"));
    console.log("Eita!");
    /*const newUser = new User({
        username: "Kek",
        email: "baa@kk.com",
        password: "654564",
    });
    newUser.save(function (error: any, document: any) {
        if (error) console.error(error);
        console.log(document);
    });*/
});

app.post("/encurtar", (req: Request, res: Response) => {
    const { url }: any = req.body;
    console.log(url);
    const shortenedUrl: URL | any = UrlShortener(url);
    console.log("shortenedUrl = " + shortenedUrl.id);
    res.send("POST ték foi");
});

app.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Log in deu");
});

app.use(express.static(siteDirectory));

app.listen(port, (err: void) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
