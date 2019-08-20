import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {NotFoundError} from 'restify-errors'
import {Rent} from './rents.model'
import {Book} from '../books/books.model'

class RentsRouter extends ModelRouter<Rent>{
    constructor(){
      super(Rent)
    }
    protected prepareOne(query: mongoose.DocumentQuery<Rent,Rent>):mongoose.DocumentQuery<Rent,Rent>{
      return query.populate('user').populate('book')
    }
  save = (req, resp, next)=>{
    let document= new Rent(req.body)
    let id = req.params.id﻿;
    Book.updateOne({ _id:id },{ $inc: { quant:-1}}).exec().catch()
    console.log("o id é"+id)
    document.save()
    .then(this.render(resp,next))

  }
  delete = (req, resp, next)=>{
    let id = req.params.id﻿
    let idBook = req.params.bookId
    Book.updateOne({ _id:idBook },{ $inc: { quant:+1}}).exec().catch()
    Rent.remove({_id:req.params.id}).exec().then((cmdResult:any)=>{
      if(cmdResult.result.n){
        resp.send(204)
      }else{
        throw new NotFoundError('Documento não encontrado')
      }
      return next()
    }).catch(next)
  }

  //}

  applyRoutes(application: restify.Server){

    application.get('/rent',this.findAll)
    application.get('/rent/:id', [this.validateId,this.findById])
    application.post('/rent/:id', this.save)
    application.post('/rent/extend/:id', [this.validateId,this.update])
    application.post('/rent/del/:id/:bookId', [this.validateId,this.delete])
    }
}
export const rentsRouter = new RentsRouter()
