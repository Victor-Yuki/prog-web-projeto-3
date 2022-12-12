const mongo = require('mongoose');

module.exports = {
    connect() {
        mongo.connect('mongodb://localhost:27017/webDB', {useNewUrlParser: true});
    }
}