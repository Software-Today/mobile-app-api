module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/signup", users.signup);

  router.post('/signin', users.signin);

  app.use('/api/users', router);
};