const { Router } = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const middleware = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  console.log('something else');
  res.status(200).json({msg: 'Get pranked'});
  // Users.get()
  //   .then(users => {
  //     res.status(200).json(users);
  //   }).catch(err => {
  //     console.error(err);
  //     res.status(500).json({message:"There was an error retrieving users from the database"});
  //   })
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
