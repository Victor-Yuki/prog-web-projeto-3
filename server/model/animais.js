const mongo = require('mongodb');

const Animal = new mongo.Schema ({
    nome: String,
    url: String,
    habitat: String,
    latim: String
});

module.exports = mongo.model('Animal', Animal);