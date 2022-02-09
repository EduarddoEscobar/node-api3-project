const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params;
  let user = await Users.getById(id);
  if(user){
    req.user = user;
    next();
  }else{
    res.status(404).json({message: 'User with the specified ID does not exist'});
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
