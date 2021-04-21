const functions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
const glob = require("glob");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
firebaseAdmin.initializeApp();

exports.testFunction = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
const files = glob.sync("./**/*.f.js", {
  cwd: __dirname,
  ignore: "./node_modules/**",
});

for (const file of files) {
  const functionName = file.split("/").pop().slice(0, -5); // Strip off '.f.js'
  const functionTarget =
    process.env.FUNCTION_TARGET || process.env.FUNCTION_NAME || "";

  // required for multi-function exports, e.g. futureArrivals.cronjob
  const rootFunction = functionTarget.split(".")[0];

  if (!rootFunction || rootFunction === functionName) {
    exports[functionName] = require(file);
  }
}
