const functions = require("firebase-functions");
const {storage} = require("../../util/adminDbUtil");
const {updateUserInAuth} = require("../services/userProfileUtils");
const {updateProfilePhotoUrl} = require("../services/userProfileUtils");
const {isViableProfilePicture} = require("../../util/processing/images/imagesProcessingService");

module.exports = functions
    .runWith({timeoutSeconds: 300, memory: '2GB'})
    .region("europe-west1")
    .storage.object().onFinalize(async (object) => {
        const {name: path, mediaLink} = object;

        if (isViableProfilePicture(path)) {
            const pathDetails = path.split('/');
            const userId = pathDetails[1];
            const publicURL = await getPublicUrl(path)
            await updateProfilePhotoUrl(userId, publicURL);
            await updateUserInAuth(userId, {photoURL: publicURL})
        }
    });

const getPublicUrl = async (path) => {
    const options = {
        action: 'read',
        expires: new Date().setFullYear(new Date().getFullYear() + 10)
    }
    return (await storage.bucket().file(path).getSignedUrl(options))[0]
}