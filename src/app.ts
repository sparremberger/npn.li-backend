import express, { Request, Response } from "express";
const path = require("path");
const app = express();
const port = 3000;

/*app.get("/", (req: Request, res: Response) => {
    console.log("teste!!");
    console.log(__dirname);
});

app.get("/api", (req: Request, res: Response) => {
    res.send("Eita");
    console.log(req.query);
});

app.get("/api/:oi", (req: Request, res: Response) => {
    res.send("Eita");
    console.log(req.params);
    console.log(req.url);
    console.log(req.body);
});
*/
app.get('/', (req : Request, res : Response) => {
    console.log("Get /");
    res.sendFile('./alanspa/index.html', { root: __dirname });

});

app.get('/projetos', (req : Request, res : Response) => {
    console.log("Get /projetos");
    res.sendFile('./alanspa/projetos.html', { root: __dirname });

});

app.get('/galeria', (req : Request, res : Response) => {
    console.log("Get /galeria");
    res.sendFile('./alanspa/galeria.html', { root: __dirname });

});

app.use(express.static('dist/alanspa'));


app.listen(port, (err: void) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
