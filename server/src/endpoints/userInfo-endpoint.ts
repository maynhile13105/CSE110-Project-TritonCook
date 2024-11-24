import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadUserInfo } from "../utils/userInfo-utils";

export function createUserInformationEndpoints(app: any, db: Database){

    app.get("/userInfo", (req: Request, res: Response) => {
        console.log("Received request for user info");
        loadUserInfo(req, res, db);
    });


}