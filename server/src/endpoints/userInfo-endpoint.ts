import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadUserInfo, loadUsername } from "../utils/userInfo-utils";

export function createUserInformationEndpoints(app: any, db: Database){

    app.get("/userInfo", (req: Request, res: Response) => {
        console.log("Received request for userInfo");
        loadUserInfo(req, res, db);
    });

    app.get("/user/:id", (req: Request, res: Response) => {
        console.log("Received request for username");
        loadUsername(req, res, db);
    })


}