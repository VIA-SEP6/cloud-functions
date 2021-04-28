const {add} = require("./asynchronousTestFunction");

test("async test example", (done) => {
	setTimeout(() => {
		expect(2).toBe(2);
		done();
	}, 500);
});

test("async test example 2, should add 2 numbers", (done) => {
	add(2, 3).then((total) => {
		expect(total).toBe(5);
		done();
	});
});

test("async test example 3, should add 2 numbers with async/await", async () => {
	const sum = await add(2, 3);
	expect(sum).toBe(5);
});
