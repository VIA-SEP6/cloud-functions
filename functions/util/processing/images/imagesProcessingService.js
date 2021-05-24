const isViableProfilePicture = (path) => {
    return path.includes("profilePicture") && path.includes("200x200");
}

module.exports = {
    isViableProfilePicture
}