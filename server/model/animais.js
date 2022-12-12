const mongo = require('mongoose');

const Schema = mongo.Schema;

const Animal = new Schema({
    nome: String,
    url: String,
    habitat: String,
    latim: String
});

module.exports = mongo.model('Animal', Animal);