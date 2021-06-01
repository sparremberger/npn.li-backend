const { Link } = require("../models/UserSchema");

class LinkController {
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

    async addLink(urlParam: string) {
        const newLink = await new Link({ link: "4a98", originalUrl: urlParam, email: "0" });
        newLink.save();
    }
}

export default LinkController;
