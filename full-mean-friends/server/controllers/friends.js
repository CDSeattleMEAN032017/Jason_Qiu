var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

module.exports={
  index:function(req, res) {
    var context={error:"",friends:""}
    Friend.find({}, function(err, friends) {
      if(err) {
        console.log('something went wrong');
        context.error={info:"backend error!"}
      } else {
        console.log('successfully get friends!');
        context.friends=friends
      }
      res.json(friends)
    })
  },
  // display web page of adding new friends
  new:function(req, res) {
    res.render('new')
  },
  //display info of one friends
  show:function(req, res) {
    var id=req.params.id
    console.log(id);
    var context={error:"",friend:""}
    Friend.findById(id, function(err, friend) {
      if(err) {
        console.log('something went wrong 1');
        context.error={info:"backend error!"}
      } else {
        console.log('successfully get friend!');
        context.friend=friend
      }
      res.json(context);
    })
  },
  //display web page for editting one friend
  edit:function(req, res) {
    var id=req.params.id
    var context={error:"",friend:""}
    var backURL=req.header('Referer') || '/';
    Friend.findById(id, function(err, friend) {
      context={}
      if(err) {
        console.log('something went wrong 2');
        context.error={info:"backend error!"}
      } else {
        console.log('successfully get friend!');
        context.friend=friend
      }
      res.render('edit',context)
    })
  },
  // Add Friend Request
  create:function(req, res) {
    console.log("POST DATA", req.body);
    var friend = new Friend({firstname: req.body.firstname,lastname: req.body.lastname, birthday: req.body.birthday});
    friend.save(function(err) {
      context={}
      info={}
      if(err) {
        console.log('***************');
        console.log(friend.errors.firstname.message);
        if ('firstname' in friend.errors){
          console.log('%%%%%%%%555');
          info.firstname=friend.errors.firstname.message
        }
        if ('lastname' in friend.errors){
          info.lastname=friend.errors.lastname.message
        }
        console.log(info);
        context.info=info
        context.errors=friend.errors
      } else {
        console.log('successfully add a friend!');
        info='successfully add a friend!'
        context.info=info
        context.friend=friend
      }
      res.json(context)
    })
  },
  //update friend request
  update:function(req, res) {
    var id=req.params.id
    var updatecontent={$set:{firstname: req.body.firstname,lastname: req.body.lastname, birthday: req.body.birthday}};
    // console.log(updatecontent);
    Friend.findByIdAndUpdate(id,updatecontent,function(err) {
      context={}
      if(err) {
        console.log('something went wrong 4');
        // res.redirect(backURL)
        context.errors=Friend.errors
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully update a friend!');
        context.info='successfully update a friend'
      }
      console.log(context);
      res.json(context)
    })
  },
  //delete an friend
  delete:function(req, res) {
    var id=req.params.id
    var backURL=req.header('Referer') || '/';
    Friend.findByIdAndRemove(id,function(err) {
      context={}
      if(err) {
        console.log('something went wrong 5');
        context.errors=Friend.errors
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully delete a friend!');
        context.info='successfully delete a friend!'
      }
      res.json(context)
    })
  }
}
