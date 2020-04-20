const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/posts', (request, response) => {
    admin
    .firestore()
    .collection('posts')
    .get()
    .then((data) => {
        let posts = [];
        data.forEach((document) => {
            posts.push({
                postsId : document.id,
                body : document.data().body,
                userName : document.data().userName,
                createdOn : document.data().createdOn
            });
        });
        return response.json(posts);
    })
    .catch((error) => console.error(error));
});

app.post('/posts', (request, response) => {
    const newPosts = {
        body : request.body.body,
        userName : request.body.userName,
        createdOn : admin.firestore.Timestamp.fromDate(new Date()),
        location : request.body.location
    };

    admin
    .firestore()
    .collection('posts')
    .add(newPosts)
    .then((document) => {
        response.json({message : `Great job, document ${document.id} created successfully`})
    })
    .catch((error) => {
        response.status(500).json({error: "Oops, something went wrong!"});
        console.error(error);
        });
    });
    
exports.api = functions.https.onRequest(app);