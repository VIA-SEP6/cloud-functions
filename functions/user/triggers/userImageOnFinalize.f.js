const functions = require("firebase-functions");
const {updateProfilePhotoUrl} = require("../services/userProfileUtils");
const {isViableProfilePicture} = require("../../util/processing/images/imagesProcessingService");

module.exports = functions
	.region("europe-west1")
	.storage.object().onFinalize(async (object) =>{
		const {name: path, mediaLink} = object;
		
		if (isViableProfilePicture(path)) {
        	const pathDetails = path.split('/');
			const userId = pathDetails[1];
			await updateProfilePhotoUrl(userId, mediaLink);
		}
	});