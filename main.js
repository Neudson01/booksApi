"use strict";
exports.__esModule = true;
var server_1 = require("./server/server");
var users_router_1 = require("./users/users.router");
var books_router_1 = require("./books/books.router");
var rents_router_1 = require("./rent/rents.router");
var server = new server_1.Server();
server.bootstrape([
    users_router_1.usersRouter,
    books_router_1.booksRouter,
    rents_router_1.rentsRouter,
]).then(function (server) {
    console.log('Server is listening on: ', server.application.address());
})["catch"](function (error) {
    console.log('Server dailed to start');
    console.error(error);
    process.exit(1);
});
