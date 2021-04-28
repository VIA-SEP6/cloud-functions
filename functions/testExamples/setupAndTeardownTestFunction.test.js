beforeEach(() => {
	console.log("beforeEach");
});

afterEach(() => {
	console.log("afterEach");
});

test('test with setupand teardown', () => {
	console.log("something in between the setup and teardown");
});
