"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var moment = require("moment");
var rentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
});
var ajustaDate = function (obj, next) {
    obj.date = moment().format('YYYY/MM/DD');
    next();
};
var saveMiddleware = function (next) {
    var rent = this;
    ajustaDate(rent, next);
    var date = moment().format('YYYY/MM/DD');
};
rentSchema.pre('save', saveMiddleware);
exports.Rent = mongoose.model('Rent', rentSchema);
