const express = require('express');
const { PORT, HOST, DB, API_URL } = require('../configuration');
const { connectDb } = require('./helpers/db');
const axios = require('axios');
const app = express();

app.get('/test', (req, res) => {
    res.send('Our authentication server is working correctly');
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '1234',
        email: 'foo@gmail.com'
    });
});

app.get('/testwithapidata', (req, res) => {
    console.log('URL-------------', req.url);
    axios.get(API_URL + '/testapidata').then(response => {
        res.json({
            testapidata: response.data.testapidata
        });
    });
});

const startServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`On host ${HOST}`);
        console.log(`Our database ${DB}`);
    });
};

connectDb()
    .on('error', (e) => {
        console.log(e);
    })
    .on('disconnected', connectDb)
    .on('open', startServer);
