import express, { Request, Response } from "express";
import { URL } from "url";
import UrlShortener from './myclasses/UrlShortener'
const path = require("path");
const app = express();
const port = 3000;

const listaDeURLS: Array<URL> = [];




// Serve para ler o req.body
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
    console.log("Get /");
    console.log(__dirname); // C:\Users\Sparremberger\Desktop\GitHub\npn.li-backend\dist
    res.sendFile(path.join(__dirname, '..', 'dist', 'npn.li', 'index.html')); // Vê bem na hora de upar o server
    //res.send("kek");

});

app.get("/api", (req: Request, res: Response) => {
    res.send("Eita");
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


app.use(express.static('dist/npn.li'));


app.listen(port, (err: void) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
