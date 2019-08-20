import* as mongoose from 'mongoose'

export interface Book extends mongoose.Document{
  name: string,
  nameControl: string,
  description: string,
  price: string,
  category: string,
  quant: number,
  total:number,
  url:string
}

const bookSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  nameControl:{
    type:String,
    required:false,
    unique:true
  },
  description:{
    type:String,
    maxlength:255,
    required: false
  },
  price:{
    type: String,
    required: String,
    maxlength:3
  },
  category:{
    type:String,
    required: true,
    maxlength:25
  },
  quant:{
    type:Number,
    required:false,
    default:1
  },
  total:{
    type: Number,
    required:false,
    default:1
  },
  url:{
    type:String,
    required:false
  }
})

const ajustaNameControl = (obj,next)=>{
  obj.nameControl=obj.name.toLowerCase().replace(/ /g,"")﻿;
  next()
}

const saveMiddleware = function(next){
  const book: Book = this
  if(!book.isModified('name')){
    next()
  }else{
    ajustaNameControl(book,next)
  }
}
const updateMiddleware = function(next){
  if(!this.getUpdate().name){
    next()
  }else{
    ajustaNameControl(this.getUpdate(),next)
  }
}

bookSchema.pre('save', saveMiddleware)
export const Book = mongoose.model<Book>('Book',bookSchema)
