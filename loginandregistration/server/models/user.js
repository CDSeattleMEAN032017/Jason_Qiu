var mongoose = require('mongoose');
var assert = require('assert');
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
   first_name: {
     type: String,
     required: [true, 'Please input first name'],
     minlength:[2,'First name must be at least 2 characters']
   },
   last_name: {
     type: String,
     required: [true, 'Please input first name'],
     minlength: [2,'Last name must be at least 2 characters']
   },
   email: {
     type: String,
     required: [true, 'Please input email'],
     unique:[true,'Email address has existed!'],
     validate: {
       validator: function( value ) {
         return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test( value );
       },
       message: "{value} is not a valid email address"
     }
   },
   birthday: {
     type: Date,
     required:[true,'Please input birthday']
   },
   passwordHash: {
     type: String,
    //  required: [true, 'Please input password'],
    //  minlength: [6,'Last name must be at lease 6 characters'],
    //  maxlength: [32,'Last name must be less than 32 characters'],
    //  validate: {
    //    validator: function( value ) {
    //      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
    //    },
    //    message: "Password failed validation, you must have at least 1 number, uppercase and special character"
    //  }
   },
  }, { timestamps: true
})

UserSchema.virtual('password')
.get(function() {
 return this._password;
})
.set(function(value) {
  if(value){
    this._password = value;
    var salt =bcrypt.genSaltSync(12);
    this.passwordHash = bcrypt.hashSync(value, salt);
  }
});

UserSchema.virtual('passwordConfirmation')
.get(function() {
 return this._passwordConfirmation;
})
.set(function(value) {
 this._passwordConfirmation = value;
});

UserSchema.path('passwordHash').validate(function(v) {
  console.log('--------------'.red);
  console.log(this._password);
  console.log(this._passwordConfirmation);
 if (this._password || this._passwordConfirmation) {
   if (!val.check(this._password).min(6)) {
     this.invalidate('password', 'must be at least 6 characters.');
   }
   if (this._password !== this._passwordConfirmation) {
     this.invalidate('passwordConfirmation', 'must match confirmation.');
   }
 }
 if (!this._passwordConfirmation && !this._password) {
   this.invalidate('password', 'required');
 }
}, null);

var User=mongoose.model('User', UserSchema);
