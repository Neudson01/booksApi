import {Router} from './router'
import {NotFoundError} from 'restify-errors'
import * as mongoose from 'mongoose'

export abstract class ModelRouter<D extends mongoose.Document> extends Router{
  constructor(protected model: mongoose.Model<D>){
    super()
  }
  protected prepareOne(query: mongoose.DocumentQuery<D,D>):mongoose.DocumentQuery<D,D>{
    return query
  }
  validateId=(req,resp,next)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
      next(new NotFoundError('Document not found'))
    }else{
      next()
    }
  }
  findAll=(req,resp,next)=>{
    this.model.find()
    .then(this.renderAll(resp,next))
    .catch(next)
  }
  findById=(req,resp,next)=>{
    this.prepareOne(this.model.findById(req.params.id))
    .then(this.render(resp,next))
    .catch(next)
  }
  save = (req,resp,next)=>{
    let document=new this.model(req.body)
    document.save()
    .then(this.render(resp,next))
    .catch(next)
  }
  replace = (req, resp,next)=>{
    const options = {runValidators:true,overwrite:true}
    this.model.update({_id:req.params.id}, req.body, options)
    .exec().then(result=>{
        if(result.n){
          return this.model.findById(req.params.id)
        }else{
            throw new NotFoundError('Documento não encontrado')
        }
    }).then(this.render(resp,next)).catch(next)
  }
  update = (req,resp,next)=>{
    const options = {runValidators:true,new: true}
    this.model.findByIdAndUpdate(req.params.id, req.body, options)
    .then(this.render(resp,next)).catch(next)
  }
  delete = (req,resp,next)=>{
    this.model.remove({_id:req.params.id}).exec().then((cmdResult:any)=>{
      if(cmdResult.result.n){
        resp.send(204)
      }else{
        throw new NotFoundError('Documento não encontrado')
      }
      return next()
    }).catch(next)
  }

}
