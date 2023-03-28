import express, { Express } from 'express';
import { Environment, MongoDB } from "@/config";
import Routes from './routes';

class Server {
    private app: Express;
    private env: Environment;
    private db: MongoDB;
    private routes: Routes;

    constructor() {
        console.log("Initializing app...");
        this.app = express();
        this.env = new Environment();
        this.db = new MongoDB(this.env.mongodb_uri, this.env.mongodb_name);
        this.routes = new Routes(this.app, this.db);
    }

    public async start() {
        await this.db.connect();

        console.log("🏎️  Starting Server...");
        this.app.listen(this.env.port, () => {
            console.log(`🏃 Server is running at ${this.env.port}`);
        })
    }
}

const app = new Server();
app.start();