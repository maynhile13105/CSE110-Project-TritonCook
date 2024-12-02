import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadUserProfile, loadProfileUsingID, loadUserProfileUsingUsername} from "../utils/userInfo-utils";

export function createUserInformationEndpoints(app: any, db: Database){

    app.get("/userProfile", (req: Request, res: Response) => {
        //console.log("Received request for user info");
        loadUserProfile(req, res, db);
    });

    app.get("/profile/:id", (req: Request, res: Response) => {
        console.log("Received request for profile using id");
        loadProfileUsingID(req, res, db);
    })

    app.get("/profile/:name", (req: Request, res: Response) => {
        //console.log("Received request for profile using username");
        loadUserProfileUsingUsername(req, res, db);
    })

}