import { MongoDB } from "@/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IRequest extends Request {
    user?: any;
}

export class AuthMiddleware {

    private token: string;
    private db: MongoDB;
    private user: any; /* User Interface */

    constructor(_db: MongoDB) {
        this.token = "";
        this.db = _db;
        this.user = null;
    }

    public check_authentication = (req: IRequest, res: Response, next: NextFunction) => { 
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            this.token = req.headers.authorization.split(` `)[1];
        }

        if(!this.token) {
            return next(new Error('Not authorized'));
        }

        try {
            this.retrieve_user();
            if(!this.user) {
                return next(new Error('User does not exist'));
            }

            req.user = this.user;
            next();
        } catch (error) {
            return next(new Error(`Not authorized. ${error}`));
        }
    }

    public check_authorization = () => { }

    private retrieve_user = () => {
        const decoded = jwt.verify(this.token, process.env.JWT_SECRET as string) as JwtPayload;
        this.user = this.db.find_one("users", { _id: decoded.user._id });
    }

    private get Token() {
        return this.token;
    }
}