var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var burgerObject = {
            burgers: data
        };

        res.render("index", burgerObject);
    });
});

router.post("/", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.name, false
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});



// Export routes for server.js to use.
module.exports = router;
