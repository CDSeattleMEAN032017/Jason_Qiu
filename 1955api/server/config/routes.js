var user = require('../controllers/apis.js');

module.exports= function(app){
  app.get('/', function(req, res) {
    user.get(req,res)
  })
  //display info of one users
  app.get('/:name', function(req, res) {
    user.getone(req,res)
  })
  // Add user Request
  app.get('/new/:name/:weight', function(req, res) {
    // console.log("POST DATA", req.body);
    user.add(req,res)
  })
  //delete an user
  app.get('/remove/:name', function(req, res) {
    user.delete(req,res)
  })
}
