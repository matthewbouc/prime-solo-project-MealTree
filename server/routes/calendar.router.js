const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * NEED MORE GET ROUTES. NEED TO THINK ABOUT HOW THIS CALENDAR IS
 * GOING TO BE DISPLAYED.
 * WILL NEED A GET ROUTE FOR ALL MEAL_PLAN.
 * MAY NEED A GET ROUTE FOR ALL CALENDARS AT SOME POINT
 */
 router.get('/', rejectUnauthenticated, (req, res) => {
  
});

/**
 * Get all calendars for a single user
 */
router.get('/all', rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM calendar_shared_users WHERE shared_user_id = $1 ORDER BY default_calendar DESC, id;`
  pool.query(queryText, [req.user.id])
  .then(result => {
    console.log('Success GETting all calendars for user', result.rows);
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error GETting all calendars for user', error);
    res.sendStatus(500);
  });
})


/**
 * GET all input meal_plan for DEFAULT = true calendars.  This will be used to display
 * the main calendar (Can be further modified to only grab certain days)
 */
router.get('/mealPlanCalendar', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = `
  SELECT date, recipes.id, recipes.name, recipes.picture, recipes.api_id FROM meal_plan
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
 * DELETE allows calendar owner to remove a shared_user from the calendar
 * OR a shared user to leave a calendar
 */
router.delete('/:calendarId', rejectUnauthenticated, (req,res) => {
  const calendarId = req.params.calendarId;
  const removeUser = req.query.userId;

  const deleteQuery = `
    DELETE FROM calendar_shared_users USING calendars
    WHERE (calendars.owner_id = $1 OR shared_user_id = $2)
      AND calendar_id = $3 AND shared_user_id = $4
    ;`
  ;
  pool.query(deleteQuery, [req.user.id, removeUser, calendarId, removeUser])
  .then((response) => {
    console.log('Success DELETing user from calendar', response);
    res.sendStatus(200);
  }).catch(error => {
    console.log('Error DELETing user from calendar', error);
    res.sendStatus(500);
  });
});


/**
 * POST creates a new calendar and adds the owner to calendar_shared_users
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const owner = req.user.id;
  const calendarName = req.body.name;
  console.log('req.user.id', owner);
  const queryText = `
    WITH newPost as (
      INSERT INTO calendars (owner_id, name)
      VALUES ($1, $2) RETURNING id, owner_id
    )
    INSERT INTO calendar_shared_users (calendar_id, shared_user_id)
      SELECT id, owner_id
      FROM newPost
    ;`
  ;
  pool.query(queryText, [owner, calendarName])
  .then(() => {
    console.log('New Calendar created');
    res.sendStatus(201);
  }).catch(error => {
    console.log ('New calendar failed', error);
    res.sendStatus(500);
  });
});


/**
 * POST to allow the calendar owner to add another user to their calendar by adding
 * that user to calendar_shared_users table.
 */
router.post('/:calendarId', rejectUnauthenticated, (req, res) => {
  const calendarId = req.params.calendarId;
  const requesterId = req.user.id;
  const addedUser = req.body.userId;

  const calendarOwner = 'SELECT owner_id FROM calendars WHERE id = $1';
  const postQuery = `INSERT INTO calendar_shared_users (calendar_id, shared_user_id)
                      VALUES ($1, $2);`
  pool.query(calendarOwner, [calendarId])
  .then(result => {
    console.log(result.rows[0].owner_id);
    if (result.rows[0].owner_id == requesterId){
      pool.query(postQuery, [calendarId, addedUser])
      .then(() => {
        res.sendStatus(201);
      })
    } else {
      res.sendStatus(403);
    }
  }).catch(error => {
    console.log('error POSTing shared user', error);
    res.sendStatus(500);
  });
})


/**
 * PUT routes to update calendar name
 */
router.put('/:calendarId', rejectUnauthenticated, (req, res) => {
  const calendarId = req.params.calendarId;
  const requesterId = req.user.id;
  const newName = req.body.calendarName;
  console.log(newName);
      
    const queryText = `UPDATE calendars SET name = $1 WHERE owner_id = $2 AND id =$3;`;
    pool.query(queryText, [newName, requesterId, calendarId])
    .then(() => {
      console.log('Success changing name');
      res.sendStatus(202);
    }).catch(error => {
      console.log('Error changing calendar name', error);
      res.sendStatus(500);
    });
});


module.exports = router;