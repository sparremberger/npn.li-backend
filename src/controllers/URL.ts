import { v4 as uuidv4 } from "uuid";


// Temporário para armazenar as urls
class URL {
    public id: string;
    public originalUrl: string;
    public owner: string;

    constructor(originalUrl: string, owner: string) {
        this.id = uuidv4().substring(0, 4); // Pega só os primeiros 4 dígitos do uuid
        this.originalUrl = originalUrl;
        this.owner = owner;
    }
}

export default URL;