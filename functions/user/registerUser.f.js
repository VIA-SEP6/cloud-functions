const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");

module.exports = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    const userInfo = request.body.user;
    if (!userInfo.username || !userInfo.password || !userInfo.email) {
      return cors(request, response, () => {
        response
          .status(400)
          .send({ status: "400", message: "Missing mandatory fields" });
      });
    }

    admin
      .auth()
      .createUser({
        disabled: false,
        emailVerified: false,
        email: userInfo.email,
        emailVerified: false,
        password: userInfo.password,
        userInfo,
      })
      .then((user) => {
        db.collection("users")
          .doc(`${user.uid}`)
          .set(userInfo)
          .then(() => {
            info(`Register User | Successful | ${user.uid}`);
            return cors(request, response, () => {
              response.sendStatus(200);
            });
          });
      })
      .catch((error_) => {
        error(`Register User | Error | ${error_}`);
        return cors(request, response, () => {
          response.sendStatus(400);
        });
      });
  });
