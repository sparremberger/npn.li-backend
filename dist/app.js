"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
app.get('/', (req, res) => {
    res.send(`oloko`);
});
app.get('/api', (req, res) => {
    res.send('Eita');
    console.log(req.query);
});
app.get('/api/:oi', (req, res) => {
    res.send('Eita');
    console.log(req.params);
    console.log(req.url);
    console.log(req.body);
});
app.listen(port, (err) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map