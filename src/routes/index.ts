import { UserRouter } from "./user";
import { Express } from "express";
import { Router } from "@/interfaces/router.interface";
import { MongoDB } from "@/config";

export default class Routes {

    private all_routes: Router[]; 

    constructor(app: Express, db: MongoDB) {
        this.all_routes = [new UserRouter(db)];
        this.setup(app);
    }

    public setup(app: Express) {
        for(let route of this.all_routes) {
            app.use(route.path, route.router_exp);
        }
    }
}