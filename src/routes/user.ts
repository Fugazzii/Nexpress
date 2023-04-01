import { UserController } from "@/controllers";
import { Router } from "@/interfaces/router.interface";
import { MongoDB } from "@/config";

export class UserRouter extends Router {
    protected controller: UserController;
    public readonly path: string;

    constructor(db: MongoDB) {
        super();
        this.controller = new UserController(db);
        this.path = "/api/users";
        this.setup();
    }

    public override setup(): void {
        this.router.get("/", this.controller.get_users);
    }
}