import {Server} from './server/server'
import  {usersRouter} from './users/users.router'
import {booksRouter} from './books/books.router'
import {rentsRouter} from './rent/rents.router'
const server = new Server()

server.bootstrape([
  usersRouter,
  booksRouter,
  rentsRouter,
]).then(server=>{
  console.log('Server is listening on: ', server.application.address())
}).catch(error=>{
  console.log('Server dailed to start')
  console.error(error)
  process.exit(1)
})
