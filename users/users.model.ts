import {validateCPF} from '../common/validator'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import {environment} from '../common/environment'

export interface User extends mongoose.Document{
  name: string,
  email: string,
  password: string
}
const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      maxlength: 80,
      minlength:3
    },
    email:{
      type:String,
      unique:true,
      match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required:true,
      lowercase:true
    },
    password:{
      type:String,
      select: false,
      required: true
    }
})

const hashPassword = (obj,next)=>{
  bcrypt.hash(obj.password, environment.security.saltRounds)
  .then(hash=>{
    obj.password = hash
    next()
  }).catch(next)
}

const saveMiddleware = function(next){
  const user: User = this
  if(!user.isModified('password')){
    next()
  }else{
    hashPassword(user,next)
  }
}
const updateMiddleware = function(next){
  if(!this.getUpdate().password){
    next()
  }else{
    hashPassword(this.getUpdate(),next)
  }
}
userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

export const User = mongoose.model<User>('User', userSchema)





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
