import express, { Request, Response } from "express";
const path = require("path");
const app = express();
const port = 3000;

// Serve para ler o conteúdo dos forms
app.use(express.urlencoded({ extended: true }))

// Serve para ler o req.body
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
    console.log("Get /");
    console.log(__dirname); // C:\Users\Sparremberger\Desktop\GitHub\npn.li-backend\dist
    res.sendFile(path.join(__dirname, '..', 'dist', 'npn.li', 'index.html')); // Vê bem na hora de upar o server
    //res.send("kek");

});

app.post('/encurtar/', (req: Request, res: Response) => {
    const { fname } : any = req.body;
    console.log(req.body.fname); 
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
