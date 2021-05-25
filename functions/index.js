const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json')
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(serviceAccount)
admin.initializeApp(adminConfig);
const glob = require("glob");

const files = glob.sync("./**/*.f.js", {
	cwd: __dirname,
	ignore: "./node_modules/**"
});

for (const file of files) {
	const functionName = file.split("/").pop().slice(0, -5); // Strip off '.f.js'
	const functionTarget =
		process.env.FUNCTION_TARGET || process.env.FUNCTION_NAME || "";

	const rootFunction = functionTarget.split(".")[0];

	if (!rootFunction || rootFunction === functionName) {
		exports[functionName] = require(file);
	}
}
