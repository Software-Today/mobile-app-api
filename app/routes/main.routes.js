module.exports = app => {
    const mainController = require("../controllers/main.controller.js");

    var router = require("express").Router();

    router.get("/getweather", mainController.get_weather);


    app.use('/api/main', router);
};