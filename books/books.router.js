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
var books_model_1 = require("./books.model");
var BooksRouter = /** @class */ (function (_super) {
    __extends(BooksRouter, _super);
    function BooksRouter() {
        var _this = _super.call(this, books_model_1.Book) || this;
        //Função para salvar livros mas antes checar se já existem alqum livro de mesmo nome se existir ele incrementa apenas a quantidade de livros
        _this.save = function (req, resp, next) {
            var valida = req.body.name.toLowerCase().replace(/ /g, "");
            books_model_1.Book.find({ nameControl: valida }).count()
                .exec().then(function (book) {
                console.log(book);
                if (book > 0) {
                    if (req.body.quant === undefined || req.body.quant === null || req.body.quant === "") {
                        req.body.quant = 1;
                    }
                    console.log(req.body.quant);
                    books_model_1.Book.updateOne({ nameControl: valida }, { $inc: { quant: req.body.quant } }).then(_this.render(resp, next))["catch"](next);
                }
                else {
                    if (req.body.quant === undefined || req.body.quant === null || req.body.quant === "") {
                        req.body.quant = 1;
                    }
                    var document_1 = new books_model_1.Book(req.body);
                    document_1.save()
                        .then(_this.render(resp, next))["catch"](next);
                }
            });
        };
        _this.findByCategory = function (req, resp, next) {
            books_model_1.Book.find({ category: req.params.category }).then(_this.render(resp, next))["catch"](next);
        };
        return _this;
    }
    BooksRouter.prototype.applyRoutes = function (application) {
        application.get('/books', this.findAll);
        application.get('/books/:id', [this.validateId, this.findById]);
        application.get('/books/find/:category', [this.findByCategory]);
        application.post('/books', this.save);
        application.post('/books/altera/:id', [this.validateId, this.update]);
        application.post('/books/del/:id', [this.validateId, this["delete"]]);
    };
    return BooksRouter;
}(model_router_1.ModelRouter));
exports.booksRouter = new BooksRouter();
