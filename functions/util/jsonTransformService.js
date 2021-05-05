const removeKey = (json, key) => {
	for (const property in json) {
		if (json.hasOwnProperty(property)) {
			if (property == key) {
				delete json[property];
			} else if (typeof json[property] === "object") {
				removeKey(json[property], key);
			}
		}
	}

	return json;
};

const removeKeys = (json, keys) => {
	for (const key of keys) {
		json = removeKey(json, key);
	}

	return json;
};

module.exports = {
	removeKey,
	removeKeys
};
