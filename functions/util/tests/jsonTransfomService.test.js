const {removeKey, removeKeys} = require("../jsonTransformService");
const jsonFile = require("./testData/movieObjectBeforeRemove.json");
const jsonFileWithoutTitle = require("./testData/movieObjectAfterTitleRemoved.json");
const jsonFileWithoutActors = require("./testData/movieObjectAfterActorsRemoved.json");
const jsonFileWithoutAge = require("./testData/movieObjectAfterAgeRemoved.json")

test("it should remove title", () => {
    result = removeKey(jsonFile, "title");
    expect(result).toStrictEqual(jsonFileWithoutTitle);
});

test("it should remove age", () => {
    result = removeKey(jsonFile, "age");
    expect(result).toStrictEqual(jsonFileWithoutAge);
})

test("it should remove actors", () => {
    result = removeKey(jsonFile, "actors");
    expect(result).toStrictEqual(jsonFileWithoutActors);
})

test("it should remove multiple keys", () => {
    result = removeKeys(jsonFileWithoutTitle, ['age','name','actors']);
    expect(result).toStrictEqual(jsonFileWithoutActors)
})

test('should not remove anything if not found', () => {
    result = removeKey(jsonFile,'something');
    expect(result).toStrictEqual(jsonFile)
})