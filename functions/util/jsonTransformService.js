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

const preAppendToKeyValue = (json, key, value) => {
	for (const property in json) {
		if (json.hasOwnProperty(property)) {
			if (property == key && json[property]) {
				json[property] = value + json[property];
			} else if (typeof json[property] === "object") {
				preAppendToKeyValue(json[property], key, value);
			}
		}
	}
	return json;
}

const preAppendValueToMultipleKeys = (json, keys, value) => {
	for (const key of keys) {
		json = preAppendToKeyValue(json,key,value)
	}
	return json;
}

module.exports = {
	removeKey,
	removeKeys,
	preAppendToKeyValue,
	preAppendValueToMultipleKeys
};
