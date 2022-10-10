module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/signup", users.signup);
  
    app.use('/api/users', router);
  };