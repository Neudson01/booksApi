# BOOKSAPI


 # Tecnologias utilizadas
1. Para o backend foi utilizado mongoDB como base de dados, e nodeJS

## Instalação
Para instalar basta executar baixar os arquivos descompactar, acessar o diretório pelo terminal e utilizar o seguinte comando:
### Instalar o mongoDB
1. Para instalar o mongoDB basta clicar aqui [MongoDB](https://www.mongodb.com/download-center/community)
2. Para MAC utilize o [tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) após isso basta seguir com a instalação
#### npm install
Esse comando vai instalar todas as dependencias necessárias para a api inicializar feito isso execute o seguinte comando ainda no diretório do arquivo
### tsc * 
após a compilação será necessário executar o seguinte comando: 
### node main.js
Se tudo correr bem deve aparecer uma mensagem de que o servidor esta escutando na porta 3000
### Funcionamento BackEnde
1. Para cada funcionalidade da API foram criadas routers e models, os models definem o schema de cada collection no MongoDb
	>>As routers definem quais urls e parâmetros devem ser passadas para adicionar, editar ou excluir determinado elemento, seja ele usuário,
	livro aluguel.
	Foi criado também um model-router genério que pode ser importado pelos outros arquivos de routers já que todos os elementos possuem funcionamento similar.
### TODO
>>Ficaram faltando implementar as mensagens de erro ao receber um retorno de erro da API, e criar uma parte de login para os usuários,
a ferramenta da forma que se encontra hoje pode ser utilizada apenas pelo administrador da biblioteca para ter o controle dos livros e 
usuarios que alugaram os livros.


### Documentação API

Existem tres arquivos de routers principais são eles
1. rents.router
2. books.routers
3. users.routers


### BooksRouters
1. Para buscar todos os livros inseridos, utilizamos a seguinte URL
	>URL://domain/books/ 
Essa URL retorna um json com todos os documents contidos na collection books dentro do MongoDB e o método utilizado é o GET

2. Para carregar os dados de um livro especpifico utiliza-se a seguinte URL
	>URL://domain/books/:id Essa URL retorna um json com os dados de um documento específico, o id é o id de um documento que já foi inserido na collection books o método utilizado é o GET
   
3. Para buscar os livros filtrando por uma categoria utiliza-se a seguinte URL
	>URL://domain/books/find/:category nessa url utilizamos o método GET, e o parametro category é acategoria que vai ser utilizada para filtrar os documentos na collection books

4. Para salvar um elemento na collection books utilizamos a seguinte URL
	>URL://domain/books/ o que diferencia essa URL é que utilizamos o método POST sendo necessário passar o document a ser inserido na collection em formato json no body da requisição
 
 5. Para alterar os dados de um livro utilizamos a seguinte URL
 	>URL://domain/books/altera/:id onde o id é o id de um document já cadastrado na collection, e o método utilizado é o POST
 
 6. Para deletar um elemento utilizamos a seguinte URL
 	>URL://domain/books/del/:id onde o id é o id de um document já cadastrado na collection, e o método utilizado é o POST
  
  ### UsersRouters
1. Para buscar todos os dados de todos os usuários cadastrados, utiliza-se a seguinte URL
	>URL://domain/users o método utilizado é o GET e ele não retorna o password do usuário

2. Para buscar as informações de um usuário específico utiliza-se a seguinte URL
	>URL://domain/users/:id onde o id se refere a um usuário já cadastrado na collection users o método é o GET

    
3. Para salvar as informações de um novo usuário utiliza-se a seguinte URL
    >URL://domain/users o que diferencia essa URL é que utilizamos o método POST sendo necessário passar o document a ser inserido na collection em formato json no body da requisição

4. Para excluir os dados de um usuário utilizamos a seguinte URL
	>URL://domain/users/:id onde o id é o id de um document já cadastrado na collection, e o método utilizado é o POST
  
  
  ### Rents Routers
1. Para criar cadastrar uma nova reserva de livro utiliza-se a seguinte URL
	>URL://domain/rent/:id e método POST o id se refere ao livro que está sendo alugado para poder decrementar a quantidade de livros disponíveis.

2. Para buscar os dados de um alugel usa-se a mesma URL
	>URL://domain/rent/:id porém o metodo utilizado é o GET e o ID se refere ao id document criado na collection rents do MongoDB após a inserção.

3. Para realizar alterações que permitem a renovação do aluguel a url utilizada é 
	>URL://domain/rent/extend/:id utilizando-se do método POST e o ID se refere ao id document criado na collection rents do MongoDB

 4. Para excluir o aluguel, utiliza-se a seguinte URL
 	>URL://domain/rent/:id/:bookId onde o id é o id de um document criado na collection rents e o bookId é o id de um livro existente na collection 
  books utilizado para incrementar a quantidade de livros após a devolução de um livro. O método utilizado é o POST
  
 
