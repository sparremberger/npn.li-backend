import express, { Request, Response } from "express";
import router from "./controllers/Routes"
import path from "path";
import mongoose from "mongoose";

//const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/users";
const UserSchema = require("./models/UserSchema");

const app = express();
const port = 3001;

const siteDirectory: string = path.join(
    __dirname,
    "..",
    "..",
    
    "npn.li",
    "npn.li",

);

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


app.use('/', router);

app.use(express.static(siteDirectory));



app.listen(port, (err: void) => {
    if (err != null) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});


