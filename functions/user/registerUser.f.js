const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");

module.exports = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    const userInfo = request.body.user;
    if (!userInfo.username || !userInfo.password || !userInfo.email) {
      return cors(request, response, () => {
        response
          .status(400)
          .send({ status: "400", message: "Missing mandatory fields" });
      });
    }

    await admin
      .auth()
      .createUser({
        disabled: false,
        emailVerified: false,
        email: userInfo.email,
        password: userInfo.password,
        userInfo,
      })
      .then((user) => {
        db.collection("users")
          .doc(`${user.uid}`)
          .set(userInfo, { merge: true })
          .then(() => {
            info(`Register User | Successful | ${user.uid}`);
            return cors(request, response, () => {
              response
                .status(200)
                .send({ status: "200", message: "User Registered" });
            });
          });
      })
      .catch((err) => {
        error(`Register User | Error | ${err}`);
        return cors(request, response, () => {
          response.status(400).send({
            status: "400",
            message: "Problem ocurred while user registration",
          });
        });
      });
  });
