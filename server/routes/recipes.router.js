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



module.exports = router;