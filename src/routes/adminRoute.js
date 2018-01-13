var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
    {
        title: 'book1',
        genre: 'catogoryA',
        author: 'John!',
        read: false
    },
    {
        title: 'book2',
        genre: 'catogoryA',
        author: 'John!',
        read: false
    },
    {
        title: 'book3',
        genre: 'catogoryA',
        author: 'John!',
        read: false
    },
    {
        title: 'book4',
        genre: 'catogoryA',
        author: 'John!',
        read: false
    }
];
var router = function(nav){

    adminRouter.route('/addBooks')
        .get(function(req, res){
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results){
                    res.send(results);
                    db.close();
                })
            });
            //res.send('inserting books');
        });


        

    return adminRouter;
};


module.exports = router;