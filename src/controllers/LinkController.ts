import { v4 as uuidv4 } from "uuid";
const { Link } = require("../models/Schema");

class LinkController {
    async getExistingUrl(urlParam: string): Promise<any> {
        let resposta;
        await Link.find({ originalUrl: urlParam }, function (err: any, result: any) {
            if (err) {
                console.log(`Deu erro ${err}`);
                return null;
            } else {
                resposta = { link: result[0].link, originalUrl: result[0].originalUrl };
            }
        });
        //console.log(teste.originalUrl);
        return resposta;
    }

    // Verifica se a url já está no banco, e retorna true ou false.
    async checkIfUrlExists(urlParam: string): Promise<boolean> {
        let urlExists: boolean = false;
        await Link.find({ originalUrl: urlParam }, function (err: any, result: any) {
            if (err) {
                console.log(`${err}`);
                urlExists = false;
                console.log(urlExists + `error`);
            } else {
                if (result.length > 0) {
                    console.log(`${urlParam} já está armazenado`);

                    urlExists = true;
                    console.log(urlExists + ` length > 0`);
                } else {
                    console.log(`a url ${urlParam} não existe no banco de dados`);
                    urlExists = false;
                    console.log(urlExists + ` else`);
                }
            }
        });
        return urlExists;
    }

    async addLinkToUser() {
        //todo
    }

    async addLink(urlParam: string) {
        /* Link = 4 dígitos aleatórios ao final de npn.li/   URL = o site original, pra onde será redirecionado
         * esse método usa o uuid pra gerar uma string única e pega os 4 primeiros caracteres */
        const newLink = await new Link({ link: uuidv4().substring(0, 4), originalUrl: urlParam});
        newLink.save();
        return newLink;

        // Nota: isso também precisa ser refatorado urgentemente. A solução atual não vai demorar muito pra começar a gerar colisões.
    }

    async clickLink(link: string, click: boolean): Promise<string> {
        let destinationUrl = await this.getLink(link, click);
        if (destinationUrl != "404") {
            return destinationUrl;
        } else {
            return destinationUrl;
        }
    }

    async getLink(link: string, click: boolean): Promise<string> {
        // CORRIGIR IMPLEMENTAÇÃO PRA TRY/CATCH COM THROW O MAIS RÁPIDO POSSÍVEL
        // https://stackoverflow.com/questions/56417623/how-to-catch-an-error-when-using-mongoose-to-query-something

        /* Verifica no banco de dados se existe um link. Caso sim, retorna a url original para redirect,
         * caso contrário retorna "404" como string */
        let result;
        let destinationUrl: string = "";
        result = await Link.find({ link: link }, function (err: any, result: any) {
            if (err) {
                console.log(`${err}`);
                destinationUrl = "404";
            }
        });

        if (result.length > 0 && click == true) {
            console.log("getLink(): link encontrado");
            destinationUrl = result[0].originalUrl;
            result[0].clicks++;
            console.log(result[0].id);
            Link.findByIdAndUpdate(result[0].id, { $inc: { clicks: 1 } }, function (err: any, data: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
            return destinationUrl;
        } else if (result.length > 0) {
            console.log("getLink(): link encontrado");
            destinationUrl = result[0].originalUrl;
            return destinationUrl;
        } else {
            destinationUrl = "404";
            return destinationUrl;
        }
    }
}

export default LinkController;
