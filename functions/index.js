const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hola Mundo!");
});

exports.getPosts = functions.https.onRequest((request, response) => {
    admin
    .firestore()
    .collection('posts')
    .get()
    .then((data) => {
        let posts = [];
        data.forEach((document) => {
            posts.push(document.data());
        });
        return response.json(posts);
    })
    .catch((error) => console.error(error));
}); 

exports.createPosts = functions.https.onRequest((request, response) => {
    const newPosts = {
        body : request.body.body,
        userName : request.body.userName,
        createdOn : admin.firestore.Timestamp.fromDate(new Date())
        // location : request.body.location
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
    
