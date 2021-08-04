const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

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
 * PUT routes to update calendar shared_users or calendar name
 */
router.put('/:calendarId', rejectUnauthenticated, (req, res) => {
  const calendarId = req.params.calendarId;
  const requesterId = req.user.id;


    
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