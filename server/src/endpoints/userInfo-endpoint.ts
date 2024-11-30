import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadUserProfile, loadUsername } from "../utils/userInfo-utils";

export function createUserInformationEndpoints(app: any, db: Database){

    app.get("/userProfile", (req: Request, res: Response) => {
        console.log("Received request for user info");
        loadUserProfile(req, res, db);
    });

    app.get("/userInfo/:id", (req: Request, res: Response) => {
        console.log("Received request for username");
        loadUsername(req, res, db);
    })


}