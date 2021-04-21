const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
// const { db, admin } = require("../util/adminDbUtil");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
module.exports = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    const { username, password, email } = request.query;
    if (!username || !password || !email) response.sendStatus(400);
    admin
      .auth()
      .createUser({
        email: email,
        emailVerified: false,
        password: password,
        disabled: false,
      })
      .then(() => {
        db.collection(`users`)
          .add({
            email: email,
            username: username,
            password: password,
          })
          .then(() => {
            cors(request, response, () => {
              response.sendStatus(200);
            });
          });
      });
  });
