import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {EventEmitter} from 'events'

export abstract class Router extends EventEmitter{
  abstract applyRoutes(application: restify.Server)
  render( response: restify.Response, next: restify.Next){
    return (document)=>{
      if(document){
        this.emit('beforeRender',document)
        response.json(document)
      }else{
        throw new NotFoundError('Documento não encontrado')
      }
      return next()
    }
  }
  renderAll(response: restify.Response, next: restify.Next){
    return(documents: any[])=>{
      if(documents){
        documents.forEach(document=>{
          this.emit('beforeRender', document)
        })
        response.json(documents)
      }else{
        response.json([])
      }
    }
  }
}
