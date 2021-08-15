const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET favorites recipe list or specific recipe id based on query of recipeId.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  //  QUERY!! (recipeId)
  const queryParameters = [req.user.id];
  let queryText = `
        SELECT recipes.* FROM users_recipes
        JOIN recipes ON recipe_id = recipes.id
        WHERE owner_id = $1`;
  if (req.query.recipeId) {
    console.log("queryParams", queryParameters);
    console.log("recipeId req.query", req.query.recipeId);
    queryText += ` AND recipe_id = $2 ORDER BY name;`;
    queryParameters.push(req.query.recipeId);
  } else {
    queryText += ` ORDER BY name;`;
  }

  pool
    .query(queryText, queryParameters)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GETting favorites recipes", error);
      res.sendStatus(500);
    });
});

/**
 * POST add new recipe to database
 */
router.post("/new", rejectUnauthenticated, (req, res) => {
  console.log("req.body", req.body);
  const name = req.body.name;
  const ingredients = req.body.ingredients;
  const procedure = req.body.procedure;
  const picture = req.body.picture;
  const api_id = req.body.api_id; // THIS WILL NEED TO BE ADDRESSED ONCE API IS INTRODUCED.  Will have  to rework queryText
  console.log(req.user.id);
  const addRecipeQuery = `
        WITH newRecipe as (
            INSERT INTO recipes (name, ingredients, procedure, picture)
            VALUES ($1, $2, $3, $4) RETURNING id
        )
        INSERT INTO users_recipes (owner_id, recipe_id) VALUES ($5, (SELECT id FROM newRecipe));`;
  pool
    .query(addRecipeQuery, [name, ingredients, procedure, picture, req.user.id])
    .then(() => {
      console.log("Success POSTing new recipe");
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error POSTing new recipe", error);
      res.sendStatus(500);
    });
});

/**
 * DELETE a recipe from the database and from users_recipes (should be deleted ON CASCADE)
 */
router.delete("/:recipeId", rejectUnauthenticated, (req, res) => {
  const recipeId = req.params.recipeId;
  console.log(req.user.id);
  const deleteQuery = `
    DELETE FROM recipes 
        USING users_recipes
	    WHERE users_recipes.owner_id = $1 AND 
        recipes.id = users_recipes.recipe_id AND users_recipes.recipe_id = $2;`; // EMULATE THIS!  This is a way to perform authentication without needing a multiple queries.  Go back and fix old routes when time permits.
  // This query works but it always produces an 200 status, even if the user isn't allowed delete (and the delete doesn't occur)

  pool
    .query(deleteQuery, [req.user.id, recipeId])
    .then(() => {
      console.log(`Success DELETing recipe`);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETing recipe", error);
      res.sendStatus(500);
    });
});

/**
 * PUT update recipe details.  // Similar to DELETE above, query gives success response even if user is not authorized and UPDATe doesn't occur.
 */
router.put("/", rejectUnauthenticated, (req, res) => {
  const recipe = req.body;
  console.log("recipe", recipe);

  const updateQuery = `
    UPDATE recipes SET name = $1, ingredients = $2, procedure = $3, picture = $4 
        FROM users_recipes
        WHERE users_recipes.owner_id = $5 AND
        recipes.id = users_recipes.recipe_id AND users_recipes.recipe_id = $6;`;
  pool
    .query(updateQuery, [
      recipe.name,
      recipe.ingredients,
      recipe.procedure,
      recipe.picture,
      req.user.id,
      recipe.id,
    ])
    .then(() => {
      console.log("Success PUTting recipe update");
      res.sendStatus(202);
    })
    .catch((error) => {
      console.log("error PUTting recipe updates", error);
      res.sendStatus(500);
    });
});

module.exports = router;
