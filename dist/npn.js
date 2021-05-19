"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const app = express_1.default();
const port = 3000;
app.get('/', (req, res) => {
    console.log("Get /");
    // console.log(__dirname); // C:\Users\Sparremberger\Desktop\GitHub\npn.li-backend\dist
    res.sendFile('./npn.li/index.html', { root: __dirname });
    //res.send("kek");
});
app.post('/encurtar', (req, res) => {
    console.log(req.body);
    res.send('POST ték foi');
});
app.use(express_1.default.static('dist/npn.li'));
app.listen(port, (err) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=npn.js.map