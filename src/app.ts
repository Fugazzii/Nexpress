import express, { Express } from 'express';
import { Environment, MongoDB } from "@/config";
import cors from "cors";
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
        this.config();
        this.routes = new Routes(this.db);
    }

    public async start() {
        await this.db.connect();
        this.routes.setup(this.app);
        
        this.listen();
    }

    private listen() {
        console.log("🏎️  Starting Server...");
        this.app.listen(this.env.port, () => {
            console.log(`🏃 Server is running at ${this.env.port}`);
        });
    }

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}

const app = new Server();
app.start();