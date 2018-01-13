var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;
var nav = [
{
    Link: '/Books',
    Text: 'Book'
},
{
    Link: '/Authors',
    Text: 'Author'
}];

var bookRouter = require("./src/routes/bookRoute")(nav);
var adminRouter = require("./src/routes/adminRoute")(nav);
var authRouter = require("./src/routes/authRoute")(nav);

app.use(express.static("public"));
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

//app.use(express.static("src/views"));
app.set('views', './src/views');
app.set('view engine', 'ejs');
// console.log(bookRouter);
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use("/Auth", authRouter);


app.get('/', function(req, res){
    res.render('index', {title:'Hello from render',nav:nav});
});

app.get('/books', function(req, res){
    res.send('Hello Books');
})


app.listen(port, function(err){
    console.log("server listen on port " + port);
});