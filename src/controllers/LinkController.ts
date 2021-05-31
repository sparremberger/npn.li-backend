const { Link } = require("../models/UserSchema");

class LinkController {
    /*async checkIfUrlExists(urlParam : string) : Promise<boolean> {
        Link.find({ url : urlParam }, function (err: any, result: any) {
            if (err) {
               // console.log("Erro ao ")
    });
    return true;
}*/

    async addLink(urlParam : string) {
        const newLink = await new Link({link : "4a98", originalUrl : urlParam, email : "0"});
        newLink.save();
    }
}

export default LinkController;