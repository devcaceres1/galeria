const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hola Mundo!");
});

exports.getPosts = functions.https.onRequest((request, response) => {
    admin.firestore().collection('posts').get().then((data) => {
        let posts = [];
        data.forEach((document) => {
            posts.push(document.data());
        });
        return response.json(posts);
    })
    .catch((error) => console.error(error));
}); 
