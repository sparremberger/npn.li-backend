"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./controllers/Routes"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
//const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/npn";
const UserSchema = require("./models/Schema");
const app = express_1.default();
const port = 3001;
// Mudar string de acordo com a estrutura do sistema hospedeiro
const siteDirectory = path_1.default.join(__dirname, "..", "..", "npn.li", "npn.li");
// Serve pra ler o req.body quando vem do form html
app.use(express_1.default.urlencoded({ extended: false }));
// Serve para ler o req.body quando parte de um json, e mais coisas
app.use(express_1.default.json());
// Cookie parser não vem por padrão no express :\
//app.use(cookieParser());
// Conecta com o mongodb usando a url lá de cima e seta algumas propriedades
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// db vai ser usado para monitorar a conexão
const db = mongoose_1.default.connection;
db.once("open", (_) => {
    console.log("Database connected:", url);
});
db.on("error", (err) => {
    console.error("connection error:", err);
});
app.use("/", Routes_1.default);
app.use(express_1.default.static(siteDirectory));
app.listen(port, (err) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=npn.js.map