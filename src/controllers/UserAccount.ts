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
                console.log(`UserAccount: Erro em autenticar token: ${err}`);
            }
            else { 
                console.log(`UserAccount: Sem erro de autenticação`);
            }
            
        });
    }
}

export default UserAccount;
