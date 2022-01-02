const exercise = require("../exercise1");

describe("fizzbuz", () => {
	it("should throw() if input is not a number", () => {
		expect(() => {
			exercise.fizzBuzz("a");
			exercise.fizzBuzz(null);
			exercise.fizzBuzz(undefined);
			exercise.fizzBuzz({});
		}).toThrow();
	});
	it("should return return the input if !( %3 or %5 ===0)", () => {
		const args = [2, 8, 17, 19, 4, 7, 16];
		args.forEach((a) => {
			const rr = exercise.fizzBuzz(a);
			expect(rr).toBe(a);
		});
	});
	it("should return Fizz if %3===0", () => {
		let r = exercise.fizzBuzz(3);
		expect(r).toBe("Fizz");
	});
	it("should return Buzz if %5 ===0", () => {
		r = exercise.fizzBuzz(5);
		expect(r).toBe("Buzz");
	});
	it("should return FizzBuz if %3 or %5 ===0", () => {
		r = exercise.fizzBuzz(15);
		expect(r).toBe("FizzBuzz");
	});
});
