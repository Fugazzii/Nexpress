import dotenv from "dotenv";

export class Environment {
    
    private readonly DOMAIN: string;
    private readonly PORT: string;
    private readonly JWT_SECRET: string;

    private readonly MONGODB_URI: string;
    private readonly MONGODB_NAME: string;

    constructor() {
        console.log(`🛠️  Configuring environment variables...`);

        dotenv.config();
        this.DOMAIN = process.env.DOMAIN as string;
        this.PORT = process.env.PORT as string;
        this.JWT_SECRET = process.env.JWT_SECRET as string;
        this.MONGODB_URI = process.env.MONGODB_URI as string;
        this.MONGODB_NAME = process.env.MONGODB_NAME as string;
    }

    private configure_path(path: string) {
        return path[0] === '/' ? path.substring(1) : path;
    }

    public url(path: string) {
        return `http://${this.DOMAIN}:${this.PORT}/${this.configure_path(path)}`;
    }

    public get mongodb_uri() {
        return this.MONGODB_URI;
    }

    public get mongodb_name() {
        return this.MONGODB_URI;
    }

    public get jwt_secret() {
        return this.JWT_SECRET;
    }

    public get port() {
        return this.PORT;
    }
}