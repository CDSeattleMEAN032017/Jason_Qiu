var express = require('express');
var session = require('express-session')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.Promise = global.Promise;

function formatDate(date) {
  var monthNames = [
    "January", "February", "March","April", "May", "June", "July", "August", "September", "October","November", "December"];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour=date.getHours();
  var min=date.getMinutes();
  var sec=date.getSeconds();
  var noon=''
  if(hour<12){
    hour=hour
    noon='am'
  } else{
    hour=hour-12
    noon='pm'
  }
  return  hour + ':' + min + ' ' + noon +' ' + monthNames[monthIndex] + ' '+ day + ' ' + year;
}

mongoose.connect('mongodb://localhost/quotingdojo');
var QuoteSchema = new mongoose.Schema({
 name: { type: String, required: true, minlength: 2},
 quote: { type: String, required: true, minlength: 10},
 // create_at:{ type: String},
 create_at:{ type: Date, default: Date.now }
})
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote')

// display default web page
app.get('/', function(req, res) {
  res.render('index');
})
//display all quotes
app.get('/quotes', function(req, res) {
  console.log("************************");
  var context={error:"",quotes:""}
  Quote.find({}).sort({create_at:-1}).exec(function(err, quotes) {
    if(err) {
      console.log('something went wrong');
      context.error={info:"backend error!"}
    } else {
      console.log('successfully get quotes!');
      console.log(quotes);
      var quotestr=[];
      for(var i=0;i<quotes.length;i++){
        date=formatDate(quotes[i].create_at);
        quotestr.push({name:quotes[i].name,quote:quotes[i].quote,create_at:date})
      }
      context.quotes=quotestr;
      // console.log(context);
      res.render('quotes',context);
    }
  })
})
// Add quote Request
app.post('/add', function(req, res) {
  console.log("POST DATA", req.body);
  var quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err) {
    if(err) {
      console.log('something went wrong 3');
      console.log(quote.errors);
      res.render('index', {title: 'you have errors!', errors: quote.errors})
    } else {
      console.log('successfully added an quote!');
      res.redirect('quotes');
    }
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
