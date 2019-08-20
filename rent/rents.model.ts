import* as mongoose from 'mongoose'
import * as moment from 'moment'
import {User} from '../users/users.model'
import {Book} from '../books/books.model'

export interface Rent extends mongoose.Document{
  title: string,
  price: number,
  start: Date,
  date: Date,
  user: mongoose.Types.ObjectId | User,
  book: mongoose.Types.ObjectId | Book
}

const rentSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  price:{
    type: Number,
    required: true
  },
  start:{
    type: Date,
    required:true
  },
  date:{
    type:Date,
    required:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  book:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required: true
  }
})
const ajustaDate = (obj,next)=>{
  obj.date=moment().format('YYYY/MM/DD');
  next()
}
const saveMiddleware = function(next){
  const rent: Rent = this
    ajustaDate(rent,next)
    let date=moment().format('YYYY/MM/DD');
}
rentSchema.pre('save', saveMiddleware)
export const Rent = mongoose.model<Rent>('Rent',rentSchema)
