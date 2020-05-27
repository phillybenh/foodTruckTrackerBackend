const request = require("supertest");
const server = require("../server");
const db = require("../../database/dbConfig");
const testDBReset = require("../../helpers/testDBReset");

// reset the database before each test run
describe('auth', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })
})