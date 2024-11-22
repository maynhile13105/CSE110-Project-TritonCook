import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadUserInfo } from "../utils/userInfo-utils";

export function createUserInfomationEndpoints(app: any, db: Database){

    app.get("/userInfo", (req: Request, res: Response) => {
        console.log("Received request for displayed recipes");
        loadUserInfo(req, res, db);
    });


}