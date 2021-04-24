const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const DB = process.env.MONGO_URL;
const API_URL = process.env.API_URL;

module.exports = {
    PORT,
    HOST,
    DB,
    API_URL
};
