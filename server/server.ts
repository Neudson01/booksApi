import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import{mergePatchBodyParser} from './merge-patch.parser'
import{handleError} from './error.handler'
import {Book} from '../books/books.model'
//import {corsMiddleware} from 'restify-cors-middleware'

export class Server{


application: restify.Server

initializeDb(): mongoose.MongooseThenable{
  (<any>mongoose.Promise)=global.Promise
  return mongoose.connect(environment.db.url,{
    useNewUrlParser:true
    //useMongoClient: true
  })
}

initRoutes(routers: Router[]=[]): Promise<any>{
  return new Promise((resolve, reject)=>{
    try{

      this.application= restify.createServer({
          name: 'booksapi',
          version: '1.0.0'
      })

        const corsMiddleware = require('restify-cors-middleware');
        const  cors = corsMiddleware({
        preflightMaxAge: 5, //Optional
        origins: ['*']
      })

      this.application.pre(cors.preflight)
      this.application.use(cors.actual)
      /*this.application.use(restify.CORS())
      this.application.opts(/.*//*, function (req,res,next) {
          res.header("Access-Control-Allow-Origin", "*")
          res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"))
          res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"))
          res.send(200)
          return next()
      })*/
      this.application.use(restify.plugins.queryParser())
      this.application.use(restify.plugins.bodyParser())
      this.application.use(mergePatchBodyParser)


      //rotas
      for (let router of routers){
        router.applyRoutes(this.application)
      }

      this.application.listen(environment.server.port, ()=>{
           resolve(this.application)
        })
        this.application.on('restifyError', handleError)
        let verificaLivros=Book.find()
        if (verificaLivros){
          let livrosPrecarregados=[
            {name: "Game of Thrones",
            nameControl:"gameofthrones" ,
            description: "Livro de fantasia",
            price: "2",
            category: "Fantasia",
            quant:"2" ,
            total:"2",
            url:"https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3065233&qld=90&l=430&a=-1=1001735828"},
            {name: "O Conto da aia",
            nameControl:"ocontodaaia" ,
            description: "Livro de Distopia",
            price: "3",
            category: "Distopia",
            quant:"3" ,
            total:"4",
            url:"http://imagens.lelivros.love/2015/09/Baixar-Livro-O-Conto-da-Aia-Margaret-Atwood-em-PDF-ePub-e-Mobi-ou-ler-online-370x555.jpg"},
            {name: "Ensaio sobre a cegueira",
            nameControl:"ensaiosobreacegueira" ,
            description: "Livro de Drama",
            price: "4",
            category: "Drama",
            quant:"3" ,
            total:"3",
            url:"http://1.bp.blogspot.com/-OZ4To6vtgIo/UWkRfSR3deI/AAAAAAAAANY/zoPeu3talJs/s1600/ensaio.png"},
            {name: "Caixa de passáros",
            nameControl:"caixadepassáros" ,
            description: "Livro de Drama",
            price: "2",
            category: "Drama",
            quant:"3" ,
            total:"3",
            url:"http://statics.livrariacultura.net.br/products/capas_lg/296/42859296.jpg"},
            {name: "Extraordinário",
            nameControl:"extraordinário" ,
            description: "Livro de ficção",
            price: "1",
            category: "Ficção",
            quant:"5" ,
            total:"5",
            url:"https://upload.wikimedia.org/wikipedia/pt/e/e2/Wonder_%28romance%29.png"},
            {name: "O pequeno príncipe",
            nameControl:"opequenoprincípe",
            description: "Livro de fábula",
            price: "4",
            category: "Fabula",
            quant:"3" ,
            total:"3",
            url:"https://zahar.com.br/sites/default/files/livros/download/OPequenoPrincipe_0.jpg"},
            {name: "A cabana",
            nameControl:"acabana" ,
            description: "Livro de suspense",
            price: "4",
            category: "Suspense",
            quant:"3" ,
            total:"3",
            url:"https://img.wook.pt/images/a-cabana-wm-paul-young/MXwyMjUzMDJ8MTc5Nzg4NzJ8MTUzMzUxMDAwMDAwMA==/250x"},
            {name: "The Last Kingdom",
            nameControl:"thelastkingdom" ,
            description: "livro de romance",
            price: "5",
            category: "Romance",
            quant:"3" ,
            total:"3",
            url:"https://2.bp.blogspot.com/-OZiJ93JRyXI/V-dGVSLcuRI/AAAAAAAADFk/JFVeCUvCG1MxyGzK0006ko9AWUjZhWNxwCLcB/s1600/oultimoreino.jpg"},
            {name: "Codigo da Vinci",
            nameControl:"codigodavinci" ,
            description: "suspense",
            price: "6",
            category: "Suspense",
            quant:"3" ,
            total:"3",
            url:"http://imagens.lelivros.love/2013/06/Download-livro-O-Codigo-Da-Vinci-Dan-Brown-em-Epub-mobi-e-PDF.jpg"},
            {name: "Inferno",
            nameControl:"inferno" ,
            description: "Suspense",
            price: "4",
            category: "Suspense",
            quant:"3" ,
            total:"3",
            url:"http://3.bp.blogspot.com/-yaf2YlzX0Mw/UjMaxe6bCrI/AAAAAAAAAqY/DFB9GQhJhGI/s1600/Inferno-Capa-Dan-Brown.jpg"},]
            //for(let i=0; i<livrosPrecarregados.length;i++){
              //let obj=livrosPrecarregados[i]
              Book.insertMany(livrosPrecarregados)
            //}
        }

    }catch(error){
      reject(error)
    }
  })
}

  bootstrape(routers: Router[]=[]): Promise<Server>{
    return this.initializeDb().then(()=>
           this.initRoutes(routers).then(()=>this))
  }
}
