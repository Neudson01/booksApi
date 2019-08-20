import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Book} from './books.model'

class BooksRouter extends ModelRouter<Book>{
  constructor(){
    super(Book)
  }

//Função para salvar livros mas antes checar se já existem alqum livro de mesmo nome se existir ele incrementa apenas a quantidade de livros
    save = (req, resp, next)=>{
      let valida = req.body.name.toLowerCase().replace(/ /g,"")﻿;
      Book.find({nameControl : valida}).count()
      .exec().then(book=>{
        console.log(book)
        if (book > 0){
          if(req.body.quant===undefined || req.body.quant===null || req.body.quant===""){
            req.body.quant=1
          }
          console.log(req.body.quant)
          Book.updateOne({ nameControl:valida },{ $inc: { quant:req.body.quant}}).then(this.render(resp,next)).catch(next)
        }else{
          if(req.body.quant===undefined || req.body.quant===null || req.body.quant===""){
            req.body.quant=1
          }
          let document= new Book(req.body)
          document.save()
          .then(this.render(resp,next))
          .catch(next)
          }
    }
  )}
  findByCategory=(req,resp,next)=>{
    Book.find({category:req.params.category}).then(this.render(resp,next))
    .catch(next)
  }
  applyRoutes(application: restify.Server){

    application.get('/books',this.findAll)
    application.get('/books/:id', [this.validateId,this.findById])
    application.get('/books/find/:category', [this.findByCategory])
    application.post('/books', this.save)
    application.post('/books/altera/:id', [this.validateId,this.update])
    application.post('/books/del/:id', [this.validateId,this.delete])
  }
}
export const booksRouter = new BooksRouter()
