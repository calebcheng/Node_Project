var mongodb = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/libraryApp';

var bookController = function(bookService, nav){

    var middleware = function(req, res, next){
        // if(!req.user){
        //     res.redirect('/');
        // }
        next();
    };

    var getIndex = function(req, res){
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results){
                res.render('bookListView', {title:'Hello from render', 
                    nav: nav,
                    books: results
                });
                db.close();
            })    
        });
    };

    var getById = function(req, res){
        var id = new objectID(req.params.id);
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, results){
                res.render('bookView', {
                    title:'Books', 
                    nav:nav,
                    book: results
                });
                db.close();
            });    
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
};


module.exports = bookController;