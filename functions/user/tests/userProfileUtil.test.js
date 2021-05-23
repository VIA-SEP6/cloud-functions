const {getUpdatedUser} = require('../services/userProfileUtils')

test('it should return object with new username', () => {
    const request = {
        userName: "David",
        age: null,
        country: null
    }
    const updatedUser = getUpdatedUser(request)
    expect(updatedUser).toStrictEqual({userName: "David"})
});

test('it should return object with new username and age', () => {
    const request = {
        userName: "David",
        age: 123,
        country: null
    }
    const updatedUser = getUpdatedUser(request)
    expect(updatedUser).toStrictEqual({userName: "David", age: 123})
});

test('it should return empty object', () => {
    const request = {
        userName: null,
        age: null,
        country: null
    }
    const updatedUser = getUpdatedUser(request)
    expect(updatedUser).toStrictEqual({})
});