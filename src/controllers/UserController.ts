import { Request, Response } from "express";
import User from "../models/User";
//const User = require("../models/User");

const userModel = require("../models/UserSchema");

class UserController {
    createNewUser(): any {
        return "kek2";
    }

    async AddNewUser(usernameS: string, emailS: string, passwordS: string) {
        let usuarioExiste: boolean[] = await this.findUser(emailS, usernameS);
        if (usuarioExiste[0]) {
            // e-mail existe
            console.log("Email existe");

            return new User('1', 'a', '11');
        }
        else if (usuarioExiste[1]) {
            // username existe
            console.log("Usuário existe");
            return new User('1', 'a', '11');
        }
        else {
            // nem e-mail nem usuario existem
            console.log("Usuário criado!");
            const newUser = await new userModel({ username : usernameS, email : emailS, password : passwordS })
            //await userModel.create({ username : usernameS, email : emailS, password : passwordS });
            newUser.save();
            return new User(usernameS, emailS, passwordS);
        }
    }

    // função assíncrona pois depende do tempo que a DB demora pra retornar
    async findUser(emailParam: string, usernameParam: string): Promise<boolean[]> {
        // se response[0] e response[1] forem ambos falsos, nem email nem username foram encontrados
        let response: boolean[] = [];
        let emailFound: boolean = false;
        let usernameFound: boolean = false;

        await userModel.find({ email: emailParam }, function (err: any, result: any) {
            // o erro nessa parte só acontece se não tiver acesso ao banco de dados ou der timeout
            if (err) {
                // supostamente checar com if(err!=null) é mais seguro, mas preciso pesquisar sobre isso.,
                emailFound = false;
                console.log(`Erro ao tentar executar a função find do mongoose para o e-mail ${emailParam} - ` + err);
            } else {
                /* O mongoose pode retornar um resultado, que nesse caso será um objeto
                ou então retornar um objeto vazio, com lenght 0. */
                if (result.length > 0) {
                    emailFound = true;
                    console.log("E-mail encontrado... emailFound setado para " + emailFound.toString());
                    console.log(result);
                } else {
                    emailFound = false;
                    console.log("E-mail não encontrado... emailFound setado para " + emailFound.toString());
                }
            }
        });

        await userModel.find({ username: usernameParam }, function (err: any, result: any) {
            if (err) {
                usernameFound = false;
                console.log(`Erro ao tentar executar a função find do mongoose para o username ${usernameParam} - ` + err);
            } else {
                if (result.length > 0) {
                    usernameFound = true;
                    console.log("Username encontrado... usernameFound setado para " + usernameFound.toString());
                    console.log(result);
                } else {
                    usernameFound = false;
                    console.log("Username não encontrado... usernameFound setado para " + usernameFound.toString());
                }
            }
        });

        response[0] = emailFound;
        response[1] = usernameFound;
        return response;

        // Revisar
        try {
            console.log("entrou no try");
            return response;
        } catch (error) {
            console.log("erro ao executar o método findUser de UserController - " + error);
            return response;
        }
    }
}

export default UserController;
