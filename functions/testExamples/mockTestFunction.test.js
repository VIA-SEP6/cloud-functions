const admin = require('firebase-admin')

test('should pass test with the proper mocks', () => {
    expect(admin.database()).toBe('mocked database')
    expect(admin.firestore()).toBe('mocked firestore')
})