"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var environment_1 = require("../common/environment");
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false,
        required: true
    }
});
var hashPassword = function (obj, next) {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(function (hash) {
        obj.password = hash;
        next();
    })["catch"](next);
};
var saveMiddleware = function (next) {
    var user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
var updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
/*userSchema.pre('save', function(next){
  const user: User = this
  if(!user.isModified('password')){
    next()
  }else{
    bcrypt.hash(user.password, environment.security.saltRounds)
    .then(hash=>{
      user.password = hash
      next()
    }).catch(next)
  }
})
userSchema.pre('findOneAndUpdate', function(next){
  if(!this.getUpdate().password){
    next()
  }else{
    bcrypt.hash(this.getUpdate().password, environment.security.saltRounds)
    .then(hash=>{
      this.getUpdate().password = hash
      next()
    }).catch(next)
  }
})*/
/*const users = [
  {id:'1', name:'Peter Parker', email: 'peter@marvel.com'},
  {id:'2', name:'Bruce Wayne', email:'bruce@dc.com'}
]

export class User{
  static findAll():Promise<any[]>{
    return Promise.resolve(users)
  }
  static findById(id: string): Promise<any>{
    return new Promise(resolve=>{
      const filtered = users.filter(user=>user.id === id)
      let user = undefined
      if (filtered.length>0){
        user=filtered[0]
      }
      resolve (user)
    })
  }
}*/
