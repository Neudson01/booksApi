"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nameControl: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        maxlength: 255,
        required: false
    },
    price: {
        type: String,
        required: String,
        maxlength: 3
    },
    category: {
        type: String,
        required: true,
        maxlength: 25
    },
    quant: {
        type: Number,
        required: false,
        "default": 1
    },
    total: {
        type: Number,
        required: false,
        "default": 1
    },
    url: {
        type: String,
        required: false
    }
});
var ajustaNameControl = function (obj, next) {
    obj.nameControl = obj.name.toLowerCase().replace(/ /g, "");
    next();
};
var saveMiddleware = function (next) {
    var book = this;
    if (!book.isModified('name')) {
        next();
    }
    else {
        ajustaNameControl(book, next);
    }
};
var updateMiddleware = function (next) {
    if (!this.getUpdate().name) {
        next();
    }
    else {
        ajustaNameControl(this.getUpdate(), next);
    }
};
bookSchema.pre('save', saveMiddleware);
exports.Book = mongoose.model('Book', bookSchema);
