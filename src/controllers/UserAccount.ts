import dotenv from "dotenv";
import { json } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

class UserAccount {
    generateAccessToken(username: string) {
        //console.log(JSON.stringify(process.env.TOKEN_SECRET));
        return jwt.sign({ username: username }, JSON.stringify(process.env.TOKEN_SECRET), { expiresIn: "30d" });
    }

    authenticateToken(token : string) {
        jwt.verify(token, JSON.stringify(process.env.TOKEN_SECRET), (err : any, user : any) => {
            if (err) {
                console.log(`Erro em autenticar ${err}`);
            }
            else { 
                console.log(`Sem erro`);
            }
            
        });
    }
}

export default UserAccount;
