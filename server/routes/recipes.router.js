const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET favorites recipe list
 */
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
        SELECT recipes.* FROM users_recipes
        JOIN recipes ON recipe_id = recipes.id
        WHERE owner_id = $1;`
    ;
    pool.query(queryText, [req.user.id])
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('Error GETting favorites recipes', error);
        res.sendStatus(500);
    });
});



module.exports = router;