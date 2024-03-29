import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {User} from './users.model'

class UserRouter extends ModelRouter<User>{
constructor(){
  super(User)
  this.on('beforeRender', document=>{
    document.password=undefined
  })
}
  applyRoutes(application: restify.Server){

    application.get('/users',this.findAll)
    application.get('/users/:id', [this.validateId,this.findById])
    application.post('/users', this.save)
    application.del('/users/:id', [this.validateId,this.delete])



    /*application.get('/users',(req,resp,next)=>{
      User.find().then(this.render(resp,next))
      .catch(next)
      //resp.json({message: 'user router'})
    })
    application.get('/users/:id',(req,resp,next)=>{
      User.findById(req.params.id)
      .then(this.render(resp,next))
      .catch(next)
    })

    application.post('/users',(req,resp,next)=>{
      let user=new User(req.body)
      user.save()
      .then(this.render(resp,next))
      .catch(next)
    })
    application.put('/users/:id',(req, resp,next)=>{
      const options = {runValidators:true,overwrite:true}
      User.update({_id:req.params.id}, req.body, options)
      .exec().then(result=>{
          if(result.n){
            return User.findById(req.params.id)
          }else{
              throw new NotFoundError('Documento não encontrado')
          }
      }).then(this.render(resp,next)).catch(next)
    })
    application.patch('/users/:id',(req,resp,next)=>{
      const options = {runValidators:true,new: true}
      User.findByIdAndUpdate(req.params.id, req.body, options)
      .then(this.render(resp,next)).catch(next)
    })
    application.del('/users/id', (req,resp,next)=>{
      User.remove({_id:req.params.id}).exec().then((cmdResult:any)=>{
        if(cmdResult.result.n){
          resp.send(204)
        }else{
          throw new NotFoundError('Documento não encontrado')
        }
        return next()
      }).catch(next)
    })*/
  }
}

export const usersRouter = new UserRouter()
