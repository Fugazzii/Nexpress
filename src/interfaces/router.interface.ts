import { Router as ExpressRouter } from "express";
import { Controller } from "./controller.interface";

export abstract class Router {
    
    protected router: ExpressRouter;
    protected controller?: Controller; // Controller
    public readonly path!: string;

    constructor() {
        this.router = ExpressRouter();
    }

    public get router_exp() {
        return this.router; 
    }

    public abstract setup(): void;
}