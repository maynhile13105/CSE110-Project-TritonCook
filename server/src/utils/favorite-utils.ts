import { Database } from "sqlite";
import { Request, Response } from "express";

export async function addFavoriteRecipe(req: Request, res: Response, db: Database) {
    try{
        const { userID, recipeID } = req.body;
        if(!userID || !recipeID ) {
            return res.status(400).send({error: "Missing required fields"});
        }
        await db.run('INSERT INTO favorite_recipes (userID, recipeID) VALUES (?,?);', [userID, recipeID]);
        res.status(201).send({userID, recipeID});
    } catch (error) {
        return res.status(400).send({error: `Recipe could not be added to your favorite list, +${error}`});
    };
}

export async function deleteFavoriteRecipe(req: Request, res: Response, db: Database) {
    const { userID, recipeID } = req.params;
    if(!userID || !recipeID ){
        return res.status(400).send({error: "Missing required fields"});
    } 

    const recipe = await db.get('SELECT * FROM favorite_recipes WHERE userID = ? AND recipeID = ?;', [userID, recipeID]);
    if(!recipe)
    {
        return res.status(404).send({error: "Recipe not found in user's favorite list"});
    }

    await db.run('DELETE FROM favorite_recipes WHERE userID = ? AND recipeID = ?;',[userID, recipeID]);
    res.status(202).send();
}

export async function getFavoriteRecipes(req: Request, res: Response, db: Database) {
    const { userID } = req.params;
    res.status(200).send({"data": await db.all('SELECT * FROM favorite_recipes WHERE userID = ?;', [userID])});
}