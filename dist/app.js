"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const app = express_1.default();
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
app.get('/', (req, res) => {
    console.log("Get /");
    res.sendFile('./alanspa/index.html', { root: __dirname });
});
app.get('/projetos', (req, res) => {
    console.log("Get /projetos");
    res.sendFile('./alanspa/projetos.html', { root: __dirname });
});
app.get('/galeria', (req, res) => {
    console.log("Get /galeria");
    res.sendFile('./alanspa/galeria.html', { root: __dirname });
});
app.use(express_1.default.static('dist/alanspa'));
app.listen(port, (err) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map