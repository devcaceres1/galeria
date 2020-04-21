const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyC0LrF5BSShUKgd2jXaqeOXIka2haUhrcg",
    authDomain: "midmod2-84cfc.firebaseapp.com",
    databaseURL: "https://midmod2-84cfc.firebaseio.com",
    projectId: "midmod2-84cfc",
    storageBucket: "midmod2-84cfc.appspot.com",
    messagingSenderId: "18428399086",
    appId: "1:18428399086:web:f5b7b9f21a11f9058c12ff",
    measurementId: "G-L6RJQ87H1K"
  };

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig)

app.get('/posts', (request, response) => {
    admin
    .firestore()
    .collection('posts')
    .orderBy('createdOn', 'desc')
    .get()
    .then((data) => {
        let posts = [];
        data.forEach((document) => {
            posts.push({
                postsId : document.id,
                body : document.data().body,
                userName : document.data().userName,
                createdOn : document.data().createdOn,
                location : document.data().location
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
    .orderBy('createdOn', 'desc')
    .add(newPosts)
    .then((document) => {
        response.json({message : `Great job, document ${document.id} created successfully`})
    })
    .catch((error) => {
        response.status(500).json({error: "Oops, something went wrong!"});
        console.error(error);
        });
    });

app.post('/signup', (request, response) => {
    const newUser = {
         email: request.body.email,
         password: request.body.password,  
         confirmPassword: request.body.confirmPassword,
         userName: request.body.userName
    };

    admin
    .firestore()
    .doc(`/users/${newUser.newUser}`)
    .get()
    .then(document => {
        if(document.exists){
            return response.status(400).json({userName: 'This User Name is taken.Try again'}) 
        } else {
            return firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
    })
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return response.status(201).json({token});
    })
    .catch((error) => {
        console.error(error);
        return response.status(500).json({error : error.code})
    }); 
});
    
exports.api = functions.https.onRequest(app);