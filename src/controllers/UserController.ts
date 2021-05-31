

const { User } = require("../models/UserSchema");
//const { Link } = require("../models/UserSchema");

class UserController {
    async AddNewUser(usernameS: string, emailS: string, passwordS: string) : Promise<string> {
        let usuarioExiste: boolean[] = await this.findUser(emailS, usernameS);
        if (usuarioExiste[0]) {
            // e-mail existe
            console.log("Email existe");
            return "O endereço de e-mail inserido já existe";
        }
        else if (usuarioExiste[1]) {
            // username existe
            console.log("Usuário existe");
            return "O nome de usuário selecionado já existe";
        }
        else {
            // nem e-mail nem usuario existem
            console.log("Usuário criado!");
            const newUser = await new User({ username : usernameS, email : emailS, password : passwordS })
            newUser.links.push("kek");
            //await userModel.create({ username : usernameS, email : emailS, password : passwordS });
            newUser.save();
            return "Conta criada com sucesso!";
        }
    }

    // retorna um usuário pelo e-mail
    async getUserByEmail(emailParam : string) : Promise<typeof User> {
        const resulti = await User.find({ email: emailParam }, function (err: any, result: any) {});
        console.log("nao por nada");
        return resulti
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
