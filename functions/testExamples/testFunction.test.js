const { add } = require('./testFunction')

test('should add the 2 numbers', () => {
    const total = add(20, 30)
    expect(total).toBe(50)
})

test('should add the 2 numbers with 2nd number having default value 10', () => {
    const total = add(20)
    expect(total).toBe(30)
})
