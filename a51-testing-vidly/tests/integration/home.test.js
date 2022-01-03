const request = require("supertest");
let server = require("../../index");

describe("GET /", () => {
	it("should give 200 in response", async () => {
		const res = await request(server).get("/api/genres");

		expect(res.status).toBe(200);
	});
	it("should give 'hello world' in response", async () => {
		const res = await request(server).get("/api/genres");

		// expect(res.body).toMatch(/world/);
		// console.log(res);
		// console.log(res.body);
		// console.log(res.text);
	});
});
