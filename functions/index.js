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

    //Variable to make sure someone does not use a space/spaces as part of one of the required fields.       

    const emptyString = (string) => {
        if(string.trim() === ''){
            return true; 
        } else {
            return false;
        };
    };

    //Variable to make sure inputted email is in fact a valid email. Firebase expression used 'RegExp' to set the value for const emailValid.

    const emailValid = (email) => {
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(email.match(regularExpression)){
            return true; 
        } else {
            return false;
        }; 
    };
        
    //Signup function

app.post('/signup', (request, response) => {
    const newUser = {
         email: request.body.email,
         password: request.body.password,  
         confirmPassword: request.body.confirmPassword,
         userName: request.body.userName
    };

    //Variable used to hold potential errors

    let allErrors = {};

    //Set of conditionals to check if required fields are not only filled, but filled correctly.    

    if(emptyString(newUser.email)){
        allErrors.email = 'Email can not be empty'
    } else if (!emailValid(newUser.email)) {
        allErrors.email = "Valid email needed"
        }

    if(emptyString(newUser.password)) {
        allErrors.password = "Password can not be empty"
    }

    if(newUser.password !== newUser.confirmPassword) {
        allErrors.confirmPassword = "Passwords do not match"
    }
   
    if(emptyString(newUser.userName)){
        allErrors.userName = 'User Name can not be empty'

    }

        //Object in this case is used as a JS class. Checking to see if the allErrors object holds any value other than zero. If in fact it does, then it'll return a 400 status.

    if(Object.keys(allErrors).length > 0){
        return response.status(400).json(allErrors);
    };
   
    let token;
    let userId;

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
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((tokenId) => {
        token = tokenId;
        const userCreds = {
            userName : newUser.userName,
            email : newUser.email,
            createdOn : admin.firestore.Timestamp.fromDate(new Date()),
            userId 
        };
        return admin
    .firestore()
    .doc(`/users/${newUser.newUser}`).set(userCreds);
    })
    .then(() => {
        return response.status(201).json({token});
    })
    .catch((error) => {
        console.error(error);
        if(error.code === "auth/email-already-in-use"){
            return response.status(400).json({email : "Email is already in use"})
        } else {
            return response.status(500).json({error : error.code})
        }
        })
    });

exports.api = functions.https.onRequest(app);