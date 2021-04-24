const express = require('express');
const mongoose = require('mongoose');
const { PORT, HOST, DB, AUTH_API_URL } = require('../configuration');
const { connectDb } = require('./helpers/db');
const app = express();
const axios = require('axios');
const { Schema } = mongoose;

const postSchema = new Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
});

app.get('/api/testapidata', (req, res) => {
    res.json({
        testapidata: true
    });
});

app.get('/testwithcurrentuser', async (req, res) => {
    console.log(AUTH_API_URL + '/testapidata', '--------------------1');
    console.log(AUTH_API_URL + '/api/testapidata', '--------------------2');
    const response = await axios.get(`${AUTH_API_URL}/currentUser`);
    return res.json({
        testwithcurrentuser: true,
        currentUserFromAuth: response.data
    });
});

// app.get('/testwithcurrentuser', async (req, res) => {
//     console.log(`${AUTH_API_URL}/currentUser`, '-----------------------VIEW');
//     try {
//         const response = await axios.get(`${AUTH_API_URL}/currentUser`);
//         console.log(response, '------------response');
//         return res.json({
//             testwithcurrentuser: true,
//             currentUserFromAuth: response.data
//         });
//     } catch (e) {
//         console.log('ОШИБКА', e);
//         return res.json({
//             testwithcurrentuser: false,
//             currentUserFromAuth: false
//         });
//     }
// });

// app.get('/posts', async (req, res) => {
//     const posts = await Post.find();
//     return res.json({
//         posts
//     });
// });

const startServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`On host ${HOST}`);
        console.log(`Our database ${DB}`);

        const silence = new Post({
            name: 'Silence'
        });
        console.log(silence, '---silence');
        await silence.save();

        const savedSilence = await Post.find();
        console.log(savedSilence, '---savedSilence with volumes!');
    });
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('open', startServer);
