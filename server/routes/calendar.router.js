const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

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
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST to create a new calendar
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const owner = req.user.id;
  const calendarName = req.body.name;
  console.log('req.user.id', owner);
  const queryText = `INSERT INTO calendars (owner_id, name, shared_users) VALUES ($1,$2);`;

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



  // if (req.body.username){
  //   const addedUser = req.body.username;
  //   console.log(`requesterId = ${requesterId}, --- addedUser = ${addedUser}
  //                 ---- calendarId = ${calendarId}`);

  //   const selectQuery = 'SELECT id FROM "user" WHERE username=$1;';


  //   const putQuery = `UPDATE calendars SET shared_users = shared_users || $1
  //                     WHERE owner_id = $2 AND id = $3;`;
  //   if (req.body.delete){
  //     putQuery = `UPDATE calendars SET shared_users - $1
  //                 WHERE owner_id = $2 AND id = $3;`;
  //   }

  //   pool.query(selectQuery, [addedUser])
  //   .then(response => {
  //     const addedUserId = response.rows[0].id;
  //     console.log('response is:', addedUserId);
  //     pool.query(putQuery, [addedUserId, requesterId, calendarId])
  //     .then(()=>{
  //       console.log('Success PUTting shared_user');
  //       res.sendStatus(202);
  //     })
  //   }).catch(error => {
  //     console.log('error during overall put', error)
  //     res.sendStatus(500);
  //   })
  // } else if (req.body.calendarName){
  //   const newName = req.body.calendarName;
  //   console.log(newName);
  // }