const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(config.dbUrl, { useNewUrlParser: true });
}