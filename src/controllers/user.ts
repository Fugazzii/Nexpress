import { Request, Response } from "express";
import { Controller } from "@/interfaces/controller.interface";
import { MongoDB } from "@/config";

export class UserController extends Controller {
    private static db: MongoDB;

    constructor(_db: MongoDB) {
        super();
        UserController.db = _db;
    }

    public async get_users(req: Request, res: Response) {
        try {
            const users = await UserController.db.find("users", {});
            res.json(users);
        } catch (error) {
            console.log(this);
        }
    }

}