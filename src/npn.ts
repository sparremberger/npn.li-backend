import express, { Request, Response } from "express";
import router from "./controllers/Routes";
import path from "path";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';


//const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/npn";
const UserSchema = require("./models/Schema");


const app = express();
const port = 3001;



// Mudar string de acordo com a estrutura do sistema hospedeiro
const siteDirectory: string = path.join(
    __dirname,
    "..",
    "..",

    "npn.li",
    "npn.li"
);

// Serve pra ler o req.body quando vem do form html
app.use(express.urlencoded({ extended: false }));

// Serve para ler o req.body quando parte de um json, e mais coisas
app.use(express.json());

// Cookie parser não vem por padrão no express :\
//app.use(cookieParser());

// Conecta com o mongodb usando a url lá de cima e seta algumas propriedades
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// db vai ser usado para monitorar a conexão
const db = mongoose.connection;

db.once("open", (_: any) => {
    console.log("Database connected:", url);
});

db.on("error", (err: any) => {
    console.error("connection error:", err);
});

app.use("/", router);

app.use(express.static(siteDirectory));

app.listen(port, (err: void) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
