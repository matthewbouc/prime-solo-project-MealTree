const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET favorites recipe list or specific recipe id based on query of recipeId.
 */
router.get('/', rejectUnauthenticated, (req, res) => { //  QUERY!! (recipeId)
    const queryParameters = [req.user.id];
    let queryText = `
        SELECT recipes.* FROM users_recipes
        JOIN recipes ON recipe_id = recipes.id
        WHERE owner_id = $1`
    ;
    if (req.query.recipeId){
        console.log(queryParameters);
        console.log(req.query.recipeId);
        queryText += ` AND recipe_id = $2;`;
        queryParameters.push(req.query.recipeId);
    } else {
        queryText += `;`;
    }

    pool.query(queryText, queryParameters)
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('Error GETting favorites recipes', error);
        res.sendStatus(500);
    });
});


/**
 * POST add new recipe to database
 */
router.post('/new', rejectUnauthenticated, (req, res) => {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const procedure = req.body.procedure;
    const picture = req.body.picture;
    const api_id = req.body.api_id; // THIS WILL NEED TO BE ADDRESSED ONCE API IS INTRODUCED.  Will have  to rework queryText

    const addRecipeQuery = `
        WITH newRecipe as (
            INSERT INTO recipes (name, ingredients, procedure, picture)
            VALUES ($1, $2, $3, $4) RETURNING id
        )
        INSERT INTO users_recipes (owner_id, recipe_id) VALUES ($5, (SELECT id FROM newRecipe));`
    ;

    pool.query(addRecipeQuery, [name, ingredients, procedure, picture, req.user.id])
    .then(() => {
        console.log('Success POSTing new recipe');
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error POSTing new recipe', error);
        res.sendStatus(500);
    });
});


module.exports = router;