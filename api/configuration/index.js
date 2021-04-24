const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const DB = process.env.MONGO_URL;
const AUTH_API_URL = process.env.AUTH_API_URL;

module.exports = {
    PORT,
    HOST,
    DB,
    AUTH_API_URL
};
