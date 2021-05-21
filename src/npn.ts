import express, { Request, Response } from "express";
import { URL } from "url";
import UrlShortener from './myclasses/UrlShortener'
const path = require("path");
const app = express();
const port = 3000;
const siteDirectory : string = path.join(__dirname, '..', '..', 'npn.li', 'npn.li');
const listaDeURLS: Array<URL> = [];

// Serve pra ler o req.body quando vem do form html
app.use(express.urlencoded({ extended: false }))
// Serve para ler o req.body quando parte de um json
app.use(express.json());




app.get('/', (req : Request, res : Response) => {
    console.log("Get /");
    console.log(__dirname); // C:\Users\Sparremberger\Desktop\GitHub\npn.li-backend\dist
    res.sendFile(path.join(siteDirectory, 'index.html')); // Vê bem na hora de upar o server
    console.log(siteDirectory);
    //res.send("kek");

});

app.post("/api", (req: Request, res: Response) => {
    const { username, email, password, confirmpassword } : any = req.body;
    res.send("Eita");
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.confirmpassword);
})

app.get("/registro", (req: Request, res: Response) => {
    res.sendFile(path.join(siteDirectory, 'cadastro.html'));
    console.log("Eita!");
})

app.post('/encurtar', (req: Request, res: Response) => {
    const { url } : any = req.body;
    console.log(url);
    const shortenedUrl : URL | any = UrlShortener(url);
    console.log("shortenedUrl = " + shortenedUrl.id);
    /*if (shortenedUrl != null) {
        console.log(shortenedUrl.id);
        console.log("AE PORRA");
    }
    console.log(req.body.url); 
    console.log(listaDeURLS.length);*/
    res.send('POST ték foi')

});

app.post('/login',  (req: Request, res: Response) => {
    console.log(req.body);
    res.send('Log in deu')

});


app.use(express.static(siteDirectory));


app.listen(port, (err: void) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
