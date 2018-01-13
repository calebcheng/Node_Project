var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;

var router = function(nav){
    var bookController = require('../controllers/bookController')(null, nav);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/').get(bookController.getIndex);

    bookRouter.route('/:id').get(bookController.getById);

    return bookRouter;
};

var testNode = function(){
    console.log("testNode notification");
}

module.exports = router;

module.exports.testNode = testNode;