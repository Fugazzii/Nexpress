import { Request, Response } from "express";
import { Controller } from "@/interfaces/controller.interface";
import { MongoDB } from "@/config";

export class UserController extends Controller {
    private db: MongoDB;

    constructor(_db: MongoDB) {
        super();
        this.db = _db;
    }

    public get_users = async (req: Request, res: Response) => {
        try {
            const users = await this.db.find("users", {});
            res.json(users);
        } catch (error) {
            console.log(this);
        }
    }
}
