const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if(user){
        req.user = user;
        next();
      }else{
        res.status(404).json({message: 'User with the specified ID was not found'});
      }
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if(name){
    next();
  }else{
    res.status(400).json({message: 'missing required name field'});
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if(text){
    next();
  }else{
    res.status(400).json({message: 'missing required text field'});
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
