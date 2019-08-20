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
var restify_errors_1 = require("restify-errors");
var rents_model_1 = require("./rents.model");
var books_model_1 = require("../books/books.model");
var RentsRouter = /** @class */ (function (_super) {
    __extends(RentsRouter, _super);
    function RentsRouter() {
        var _this = _super.call(this, rents_model_1.Rent) || this;
        _this.save = function (req, resp, next) {
            var document = new rents_model_1.Rent(req.body);
            var id = req.params.id;
            books_model_1.Book.updateOne({ _id: id }, { $inc: { quant: -1 } }).exec()["catch"]();
            console.log("o id é" + id);
            document.save()
                .then(_this.render(resp, next));
        };
        _this["delete"] = function (req, resp, next) {
            var id = req.params.id;
            var idBook = req.params.bookId;
            books_model_1.Book.updateOne({ _id: idBook }, { $inc: { quant: +1 } }).exec()["catch"]();
            rents_model_1.Rent.remove({ _id: req.params.id }).exec().then(function (cmdResult) {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            })["catch"](next);
        };
        return _this;
    }
    RentsRouter.prototype.prepareOne = function (query) {
        return query.populate('user').populate('book');
    };
    //}
    RentsRouter.prototype.applyRoutes = function (application) {
        application.get('/rent', this.findAll);
        application.get('/rent/:id', [this.validateId, this.findById]);
        application.post('/rent/:id', this.save);
        application.post('/rent/extend/:id', [this.validateId, this.update]);
        application.post('/rent/del/:id/:bookId', [this.validateId, this["delete"]]);
    };
    return RentsRouter;
}(model_router_1.ModelRouter));
exports.rentsRouter = new RentsRouter();
