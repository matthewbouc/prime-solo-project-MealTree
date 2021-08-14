const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// '/api/calendar'


// #########  CALENDAR_SHARED_USERS ROUTES ############   //

/**
 * GET all calendars for the user, default first
 */
router.get('/all', rejectUnauthenticated, (req, res) => {

  const queryText = `
  SELECT calendar_shared_users.*, calendars.name FROM calendar_shared_users 
  JOIN calendars ON calendars.id = calendar_shared_users.calendar_id
  WHERE shared_user_id = $1 ORDER BY default_calendar DESC, id;`
  pool.query(queryText, [req.user.id])
  .then(result => {
    console.log('Success GETting all calendars for user', result.rows);
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error GETting all calendars for user', error);
    res.sendStatus(500);
  });
});

/**
 * PUT updates which calendar is "default" and displayed as main calendar.  SETs all other calendars to not default, then sets default.
 */
router.put('/default', rejectUnauthenticated, (req, res) => {
  const newDefaultCalendar = req.body.default;
  const userId = req.user.id;
  const removeDefaultQuery = `UPDATE calendar_shared_users SET default_calendar = false WHERE shared_user_id = $1;`;
  const addDefaultQuery = `UPDATE calendar_shared_users SET default_calendar = true WHERE shared_user_id = $1 AND calendar_id = $2;`;

  pool.query(removeDefaultQuery, [userId])
  .then(() => {
    pool.query(addDefaultQuery, [userId, newDefaultCalendar])
    .then(() => {
      console.log('Success PUTting new Default Calendar');
      res.sendStatus(202);
    })
  }).catch(error => {
    console.log('Error PUTting new Default calendar', error);
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


//  ########   CALENDARS ROUTES  ##############   // 


/**
 * POST creates a new calendar and adds the owner to calendar_shared_users
 */
 router.post('/', rejectUnauthenticated, (req, res) => {
  const owner = req.user.id;
  const calendarName = req.body.name || 'New Calendar';
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