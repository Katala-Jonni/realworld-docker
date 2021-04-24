const mongoose = require('mongoose');
const { DB } = require('../../configuration');

module.exports.connectDb = () => {
    mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connection;
};
