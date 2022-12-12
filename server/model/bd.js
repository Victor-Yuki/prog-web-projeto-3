const mongo = require('mongodb');

module.exports = {
    connect() {
        mongo.connect('mongodb://localhost:27017/webDB', {useNewUrlParser: true});
    }
}