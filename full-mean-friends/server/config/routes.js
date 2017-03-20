var friends = require('../controllers/friends.js');

module.exports = function(app){
  app.get('/friends', function(req, res) {
    friends.index(req, res);
  });
  app.get('/friends/new', function(req, res) {
    friends.new(req, res);
  });
  app.get('/friends/:id/edit', function(req, res) {
    friends.edit(req, res);
  });
  app.get('/friends/:id', function(req, res) {
    friends.show(req, res);
  });
  app.post('/friends', function(req, res) {
    // console.log(req.body);
    friends.create(req, res);
  });
  app.put('/friends/:id', function(req, res) {
    // console.log('****************');
    // console.log(req);
    friends.update(req, res);
  });
  app.delete('/friends/:id', function(req, res) {
    friends.delete(req, res);
  });
}
