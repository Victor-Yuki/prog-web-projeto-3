const mongo = require('mongoose');

module.exports = {
    connect() {
        return mongo.connect('mongodb://localhost:27017/webDB', {useNewUrlParser: true});
    }
}