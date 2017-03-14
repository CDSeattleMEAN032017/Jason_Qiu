var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports={
  get:function(req, res) {
    User.find({}, function(err, users) {
      if(err) {
        console.log('something went wrong');
        res.status(500).json({info:"backend error!"})
      } else {
        console.log('successfully get users!');
        // console.log(users);
        res.json(users)
      }
    })
  },
  //response info of one users
  getone:function(req, res) {
    var name=req.params.name
    User.findOne({name:name}, function(err, user) {
      if(err) {
        console.log(err);
        res.status(500).json({info:"backend error!"})
      } else {
        console.log('successfully get user!');
        // console.log(user);
        res.json(user)
      }
    })
  },
  // Add User Request
  add:function(req, res) {
    // console.log("POST DATA", req.params);
    var user = new User({name: req.params.name, weight: req.params.weight});
    user.save(function(err,newuser) {
      if(err) {
        console.log(err);
        res.status(500).json({info:"add new user failed.backend error!"})
      } else {
        console.log(`successfully added ${user.name} an user!`);
        res.json(newuser)
        // url=/newuser.name
        // res.redirect('url');
      }
    })
  },
  //delete an user
  delete:function(req, res) {
    var name=req.params.name
    var backURL=req.header('Referer') || '/';
    User.deleteMany({name:name},function(err,user) {
      console.log(user);
      if(err) {
        res.status(500).json({info:"delete user failed.backend error!"})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully remove an user!');
        res.json({info:`delete  successfully!`})
      }
    })
  }
}
