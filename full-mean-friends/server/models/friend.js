var mongoose = require('mongoose');
var FriendSchema = new mongoose.Schema({
 firstname: {type: String, required: true, minlength: 2},
 lastname: {type: String, required: true, minlength: 2},
 birthday: {type: Date, required: false}
})
var Friend=mongoose.model('Friend', FriendSchema);
