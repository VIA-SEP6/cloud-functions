const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");

module.exports = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    const { username, password, email, age, country } = request.body;
    if (!username || !password || !email)
      return cors(request, response, () => {
        response.status(400).send({ data: "Missing mandatory fields" });
      });
    await admin
      .auth()
      .createUser({
        email: email,
        emailVerified: false,
        password: password,
        disabled: false,
      })
      .then((user) => {
        db.collection(`users`)
          .doc(`${user.uid}`)
          .set({
            email: email,
            username: username,
            age: age,
            country: country,
          })
          .then(() => {
            info(`Register User | Successful | ${email}`);
            return cors(request, response, () => {
              response.sendStatus(200);
            });
          });
      })
      .catch((err) => {
        error(`Register User | Error | ${err}`);
        return cors(request, response, () => {
          response.sendStatus(400);
        });
      });
  });
