const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//   ##############   MEAL_PLAN CALENDAR  ################## //


/**
 * GET all input meal_plan for DEFAULT = true calendar.  This will be used to display
 * the main calendar (Can be further modified to only grab certain days)
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const queryText = `
    SELECT meal_plan.id, meal_plan.calendar_id, date, recipes.id, recipes.name, recipes.picture, recipes.api_id FROM meal_plan
        JOIN calendars ON calendars.id = meal_plan.calendar_id
        JOIN calendar_shared_users ON calendar_shared_users.calendar_id = calendars.id
        JOIN recipes ON meal_plan.recipe_id = recipes.id
        WHERE calendar_shared_users.shared_user_id = $1 AND calendar_shared_users.default_calendar = TRUE;`
    ;
    pool.query(queryText, [userId])
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('error GETting mealPlanCalendar', error);
        res.sendStatus(500);
    });
});


/** 
 * POST adding a meal_plan to calendar with date, category, recipe.  Verifies user is a shared_user of calendar.
 */
router.post('/', rejectUnauthenticated, async (req, res) => {

    const userId = req.user.id;
    const calendarId = req.body.calendarId;
    const mealDate = req.body.date;
    const mealCategory = req.body.category;
    const recipeId = req.body.recipeId;
    let isVerified;

    console.log('what is body', req.body);

    const verifyUserQuery = `SELECT calendar_id FROM calendar_shared_users WHERE shared_user_id = $1;`;
    const postNewMeal = `INSERT INTO "meal_plan" ("calendar_id", "date", "category_id", "recipe_id") VALUES ($1, $2, $3, $4);`;
    await pool.query(verifyUserQuery, [userId])
    .then(result => {
        console.log('result rows:', result.rows);
        for (calendar of result.rows){
            if (calendar.calendar_id == calendarId){
                isVerified = true;
            }
        }
    }).catch(error => {
        console.log('Error POSTing', error);
        res.sendStatus(500);
    });

    if (isVerified){
        pool.query(postNewMeal, [calendarId, mealDate, mealCategory, recipeId])
        .then(() => {
            console.log('Success POSTing meal_plan');
            res.sendStatus(201);
        }).catch(error => {
            console.log('Error POSTing meal_plan', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


/**
 * DELETE row from meal_plan - must be shared_user
 */
router.delete('/', rejectUnauthenticated, async (req,res) => { // QUERY
    
    let isVerified;
    const calendarId = req.query.calendarId;
    const mealPlanId = req.query.mealPlan;

    const verifyUserQuery = `SELECT calendar_id FROM calendar_shared_users WHERE shared_user_id = $1;`;
    const deleteQuery = `DELETE FROM meal_plan WHERE id = $1 AND calendar_id = $2;`;  // double verification to ensure correct row is deleted. (no maliciousness)

    await pool.query(verifyUserQuery, [req.user.id])
    .then(result => {
        console.log('result rows:', result.rows);
        for (calendar of result.rows){
            if (calendar.calendar_id == calendarId){
                isVerified = true;
            }
        }
    }).catch(error => {
        console.log('Error POSTing', error);
        res.sendStatus(500);
    });

    if (isVerified){
        pool.query(deleteQuery, [mealPlanId, calendarId])
        .then(() => {
            console.log('Success DELETing');
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error DELETing', error)
            res.sendStatus(500);
        });
    }else {
        res.sendStatus(403);
    }
});



/**
 * PUT to update meal_plan row
 */
router.put('/', rejectUnauthenticated, async (req, res) => { // BODY
    let queryText;
    if (req.body.category){
        queryText = `UPDATE meal_plan SET category_id = $1 WHERE id = $2 AND calendar_id = $3;`; // verifies both are true to avoid malicious activity
    } else if (req.body.date){
        queryText = `UPDATE meal_plan SET date = $1 WHERE id = $2 AND calendar_id = $3;`; // verifies both are true to avoid malicious activity
    }
    const verifyUserQuery = `SELECT calendar_id FROM calendar_shared_users WHERE shared_user_id = $1;`;

    const valueToChange = req.body.category || req.body.date;
    const calendarId = req.body.calendarId;
    const mealPlanId = req.body.mealPlanId;
    let isVerified;

    await pool.query(verifyUserQuery, [req.user.id])
    .then(result => {
        console.log('result rows:', result.rows);
        for (calendar of result.rows){
            if (calendar.calendar_id == calendarId){
                isVerified = true;
            }
        }
    }).catch(error => {
        console.log('Error POSTing', error);
        res.sendStatus(500);
    });

    if (isVerified){
        pool.query(queryText, [valueToChange, mealPlanId, calendarId])
        .then(() => {
            console.log('Success DELETing');
            res.sendStatus(202);
        }).catch(error => {
            console.log('Error DELETing', error)
            res.sendStatus(500);
        });
    }else {
        res.sendStatus(403);
    }
});
  
  
module.exports = router;