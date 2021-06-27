/* Classe responsável por todas as operações envolvendo usuários. Buscar no banco de dados,
 * cadastrar novo usuário, logar com conta já criada, obter lista de usuários, etc. */

const { User, Token } = require("../models/Schema");
import bcrypt from "bcrypt";
import UserAccount from "./UserAccount";

const ROUNDS = 10;
const userAccount = new UserAccount();



class UserController {
    async loginUser(email: string, password: string): Promise<string> {
        // 0 = email não encontrado, 1 = senha errada, token = login success
        let temporaryTokenTest = "0";
        // nessas horas eu lembro do JSON.parse e stringify
        const user = await this.getUserByEmail(email);
        if (user.length == 0) {
            console.log(`Email não encontrado`);
            return temporaryTokenTest;
        } else {
            const isValid: boolean = await bcrypt.compare(password, user[0].password);
            if (isValid) {
                console.log(`a senha está correta`);
                temporaryTokenTest = userAccount.generateAccessToken(email);
                console.log(`TTT = ${temporaryTokenTest}`);
                userAccount.authenticateToken(temporaryTokenTest); // só pra testar
                this.addTokenToDb(email, temporaryTokenTest);
                return temporaryTokenTest;
            } else {
                console.log(`errou cpx`);
                temporaryTokenTest = "1";
                return temporaryTokenTest;
            }
        }
    }

    async addTokenToDb(emailS: string, tokenS: string) {
        this.deletePreviousToken(emailS);
        const newToken = await new Token({ email: emailS, token: tokenS });
        //newToken.tokens.push("kek");
        //await userModel.create({ username : usernameS, email : emailS, password : passwordS });
        newToken.save();
    }

    async deletePreviousToken(emailS : string) {
        await Token.deleteOne({ email: emailS }, function (err: any, result: any) {
            // implementar try catch?
        });
    }

    // Verifica se a token do usuário existe no DB
    async AuthenticateUserByToken(userToken: string) {
        const kek = await this.getUserByToken(userToken);
        console.log(kek);
        //await
    }

    checkForToken() {}

    async getUserByToken(tokenParam: string): Promise<typeof Token> {
        const result = await Token.find({ token: tokenParam }, function (err: any, result: any) {
            // kek?
        });
        return result;
    }

    // retorna um usuário pelo e-mail
    async getUserByEmail(emailParam: string): Promise<typeof User> {
        const result = await User.find({ email: emailParam }, function (err: any, result: any) {
            // implementar try catch
        });
        return result;
    }

    async AddNewUser(usernameS: string, emailS: string, passwordS: string): Promise<string> {
        let usuarioExiste: boolean[] = await this.findUser(emailS, usernameS);
        if (usuarioExiste[0]) {
            // e-mail existe
            console.log("Email existe");
            return "O endereço de e-mail inserido já existe";
        } else if (usuarioExiste[1]) {
            // username existe
            console.log("Usuário existe");
            return "O nome de usuário selecionado já existe";
        } else {
            // nem e-mail nem usuario existem
            const hashedPassword = await bcrypt.hash(passwordS, ROUNDS); // aplica um hash na senha
            const newUser = await new User({ username: usernameS, email: emailS, password: hashedPassword });
            newUser.links.push("kek");
            //await userModel.create({ username : usernameS, email : emailS, password : passwordS });
            newUser.save();
            return "Conta criada com sucesso!";
        }
    }

    // função assíncrona pois depende do tempo que a DB demora pra retornar
    // Verifica se um usuário já existe com o email ou username
    async findUser(emailParam: string, usernameParam: string): Promise<boolean[]> {
        // se response[0] e response[1] forem ambos falsos, nem email nem username foram encontrados
        let response: boolean[] = [];
        let emailFound: boolean = false;
        let usernameFound: boolean = false;

        await User.find({ email: emailParam }, function (err: any, result: any) {
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

        await User.find({ username: usernameParam }, function (err: any, result: any) {
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
