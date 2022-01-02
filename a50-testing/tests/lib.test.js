const lib = require("../lib");
const db = require("../db");
const email = require("../mail");

describe("absolute", () => {
	test("should return a positive number if the input is positive", () => {
		const r = lib.absolute(1);
		expect(r).toBe(1);
	});
	test("should return a positive number if the input is negative", () => {
		const r = lib.absolute(-1);
		expect(r).toBe(1);
	});
	test("should return 0 if the input is 0", () => {
		const r = lib.absolute(0);
		expect(r).toBe(0);
	});
});

describe("greet", () => {
	it("should return a greeting message", () => {
		const r = lib.greet("luke");
		expect(r).toMatch(/luke/);
	});
});

describe("getCurrencies", () => {
	it("should return supported currencies", () => {
		const r = lib.getCurrencies();
		// t<oo general
		// expect(r).toBeDefined();
		//proper way
		// expect(r).toContain("USD");
		expect(r).toEqual(expect.arrayContaining(["USD", "EUR"]));
	});
});

describe("getProduct", () => {
	it("should return the product with the given id", () => {
		const r = lib.getProduct(1);
		// t<oo general
		// expect(r).toBeDefined();
		//proper way
		// expect(r).toContain("USD");
		// expect(r).toEqual({ id: 1, price: 10 });
		expect(r).toMatchObject({ id: 1, price: 10 });
	});
});

describe("registerUser", () => {
	it("should throw() if username is falsy", () => {
		// const r = lib.registerUser(null);
		// expect(r).toThrow();
		// expect(() => {
		// 	lib.registerUser(null);
		// }).toThrow();
		const args = [null, undefined, NaN, 0, "", false];
		args.forEach((a) => {
			expect(() => {
				lib.registerUser(a);
			}).toThrow();
		});
	});
	it("should return a user obj if a valid username is passed", () => {
		const r = lib.registerUser("mosh");
		expect(r).toMatchObject({ username: "mosh" });
		expect(r.id).toBeGreaterThan(0);
	});
});

describe("applyDiscountFunction", () => {
	it("should apply a 10% discount if user points>20", () => {
		db.getCustomerSync = function (cID) {
			console.log("Fake user data..");
			return { id: cID, points: 20 };
		};

		const order = { customerId: 1, totalPrice: 10 };
		lib.applyDiscount(order);
		expect(order.totalPrice).toBe(9);
	});
});

describe("notifyCustomer", () => {
	it("should send an email to the customer Version-1.0", () => {
		db.getCustomerSync = function (cID) {
			console.log("Fake user email..");
			return { email: "a" };
		};

		let isEmailSent = false;
		email.send = function (to, subject) {
			isEmailSent = true;
			console.log("Fake Sending an email...");
		};

		const order = { customerId: 1, totalPrice: 10 };
		lib.notifyCustomer(order);
		expect(isEmailSent).toBe(true);
	});
	it("should send an email to the customer Version-2.0", () => {
		db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
		// db.getCustomerSync = function (cID) {
		// 	console.log("Fake user email..");
		// 	return { email: "a" };
		// };

		email.send = jest.fn();
		// let isEmailSent = false;
		// email.send = function (to, subject) {
		// 	isEmailSent = true;
		// 	console.log("Fake Sending an email...");
		// };

		const order = { customerId: 1, totalPrice: 10 };
		lib.notifyCustomer(order);
		// expect(isEmailSent).toBe(true);
		expect(email.send).toHaveBeenCalled();
	});
	it("should send an email to the customer Version-2.1", () => {
		db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
		email.send = jest.fn();

		lib.notifyCustomer({ customerId: 1 });

		// Too much specific..
		expect(email.send).toHaveBeenCalledWith(
			"a",
			"Your order was placed successfully."
		);
		expect(email.send).toHaveBeenCalled();
		expect(email.send.mock.calls[0][0]).toBe("a");
		expect(email.send.mock.calls[0][1]).toMatch(/order/);
	});
});
