var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports={
  profile:function(req, res) {
    var userid=req.params.userid
    console.log(id);
    var context={error:"",user:""}
    User.findById(uerid, function(err, user) {
      if(err) {
        console.log('something went wrong 1');
        context.error={info:"backend error!"}
      } else {
        console.log('successfully get user!');
        context.user=user
      }
      res.json(context);
    })
  },
  // registers Request
  register:function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      birthday: req.body.birthday});
    console.log(user);
    user.save(function(err,userobj) {
      context={}
      info={}
      if(err) {
        //console.log(user.errors);
        // if ('firstname' in user.errors){
        //   info.firstname=user.errors.firstname.message
        // }
        console.log(info);
        context.info=user.errors
      } else {
        info='successfully add a user!'
        context.info=info
        context.user=userobj
        console.log(userobj);
      }
      res.json(context)
    })
  },
  // Login Request
  // login:function(req, res) {
  //   console.log("POST DATA", req.body);
  //   var email= req.body.email
  //   var password=req.body.password,
  //   User.findOne({email:email},function(err,user) {
  //     context={}
  //     info={}
  //     if(err) {
  //       console.log(err);
  //       context.info=User.errors
  //     } else {
  //       info='successfully add a user!'
  //       context.info=info
  //       context.user=user
  //     }
  //     res.json(context)
  //   })
  // },

  //delete an user
  logout:function(req, res) {
    // var id=req.params.id
    // var backURL=req.header('Referer') || '/';
    // User.findByIdAndRemove(id,function(err) {
    //   context={}
    //   if(err) {
    //     console.log('something went wrong 5');
    //     context.errors=User.errors
    //   } else { // else console.log that we did well and then redirect to the root route
    //     console.log('successfully delete a user!');
    //     context.info='successfully delete a user!'
    //   }
    //   res.json(context)
    // })
  }
}
