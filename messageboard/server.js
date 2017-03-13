var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
  if (hour<10){ hour='0'+hour};
  var min=date.getMinutes();
  if (min<10){ min='0'+min};
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

mongoose.connect('mongodb://localhost/messageboard');
// define Schema variable
var Schema = mongoose.Schema;
// define Post Schema
var PostSchema = new mongoose.Schema({
  name:{type: String, required: true, minlength: 2},
  text: {type: String, required: true, minlength: 10 },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  create_at:{ type: Date, default: Date.now },
}, {timestamps: true });
// define Comment Schema
var CommentSchema = new mongoose.Schema({
  commer:{type: String, required: true, minlength: 2},
  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
  comment: {type: String, required: true, minlength: 10 },
  create_at:{ type: Date, default: Date.now },
}, {timestamp: true });
// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// store our models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// route for getting all posts and comments
app.get('/', function (req, res){
 Post.find()
 .populate('comments')
 .sort({create_at:-1})
 .exec(function(err, posts) {
    if(! err){
      // console.log('********************');
      // console.log(posts);
      var poststr=[];
      for(var i=0;i<posts.length;i++){
        date=formatDate(posts[i].create_at);
        commentstr=[]
        for(var j=0;j<posts[i].comments.length;j++){
          date=formatDate(posts[i].comments[j].create_at);
          commentstr.push({commer:posts[i].comments[j].commer,comment:posts[i].comments[j].comment,create_at:date})
        }
        poststr.push({name:posts[i].name,text:posts[i].text,create_at:date,comments:commentstr})
      }
      console.log(poststr);
      res.render('index', {posts: poststr});
    }
  });
});
// route for creating one comment with the parent post id
app.post('/posts/:id', function (req, res){
  Post.findOne({_id: req.params.id}, function(err, post){
         var comment = new Comment(req.body);
         comment._post = post._id;
         post.comments.push(comment);
         comment.save(function(err){
            if(! err){
              post.save(function(err){
                   if(err) { console.log('Error'); }
                   else { res.redirect('/'); }
                 });
           } else{
             Post.find()
             .populate('comments')
             .sort({create_at:-1})
             .exec(function(err1, posts) {
                if(! err1){
                  console.log(posts);
                  res.render('index', {posts: posts, errors: comment.errors,postid:req.params.id});
                }
              });
           }
         });
   });
 });
// route for creating one post
app.post('/posts', function (req, res){
  console.log("POST DATA", req.body);
  var post = new Post({name: req.body.name, text: req.body.text, comments:[]});
  post.save(function(err) {
    if(err) {
      console.log(post.errors);
      Post.find()
      .populate('comments')
      .sort({create_at:-1})
      .exec(function(err1, posts) {
         if(! err1){
           console.log(posts);
           res.render('index', {posts: posts, errors: post.errors});
         }
       });
    } else {
      console.log('successfully added an quote!');
      res.redirect('/');
    }
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
