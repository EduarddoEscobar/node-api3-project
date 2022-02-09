const { Router } = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const middleware = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users);
    }).catch(err => {
      console.error(err);
      res.status(500).json({message:"There was an error retrieving users from the database"});
    })
});

router.get('/:id', middleware.validateUserId ,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    }).catch(err => {
      console.error(err);
      res.status(500).json({message:"There was an error saving the user to the database"});
    })
});

router.put('/:id', [middleware.validateUserId, middleware.validateUser], (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    }).catch(err => {
      console.error(err);
      res.status(500).json({message:"The user could not be modified"});
    })
});

router.delete('/:id', middleware.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try{
    await Users.remove(req.params.id);
    res.status(200).json(req.user);
  }catch{
    res.status(500).json({message:"The user could not be removed"});
  }

});

router.get('/:id/posts', middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.get()
    .then(posts => {
      res.status(200).json(posts.filter(post => post.user_id === Number(req.params.id)));
    }).catch(err => {
      console.error(err);
      res.status(500).json({message:"The posts could not be retrieved"});
    })
});

router.post('/:id/posts',[middleware.validateUserId, middleware.validatePost], (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert({...req.body, user_id: req.user.id})
    .then(post => {
      res.status(201).json(post);
    }).catch(err => {
      res.status(500).json({message:"There was a problem saving the post on the database"});
    })
});

// do not forget to export the router
module.exports = router;
