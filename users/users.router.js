"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var model_router_1 = require("../common/model-router");
var users_model_1 = require("./users.model");
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        var _this = _super.call(this, users_model_1.User) || this;
        _this.on('beforeRender', function (document) {
            document.password = undefined;
        });
        return _this;
    }
    UserRouter.prototype.applyRoutes = function (application) {
        application.get('/users', this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', this.save);
        application.del('/users/:id', [this.validateId, this["delete"]]);
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
    };
    return UserRouter;
}(model_router_1.ModelRouter));
exports.usersRouter = new UserRouter();
