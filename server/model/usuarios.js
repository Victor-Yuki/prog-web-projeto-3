const mongo = require('mongoose');

const Usuario = new mongo.Schema({
    email: String,
    senha: String,
    admin: Boolean
});

module.exports = mongo.model("Usuario", Usuario);
