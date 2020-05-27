const request = require("supertest");
const server = require("../server");
const testDBReset = require("../../helpers/testDBReset");

// reset the database before each test run
beforeEach(testDBReset);

describe('auth', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })
})

describe('POST to api/register', () => {
    it('cannot register an incomplete user', async () => {
        const res = await request(server)
            .post('/api/register')
            .send({
                username: "testUser99",
            });

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({
            message: "Please provide a valid password."
        });
    })
    it('can register a user', async () => {
        const res = await request(server)
            .post('/api/register')
            .send({
                username: "testUser",
                password: "pwd123",
                email: "email@string.com",
                operator: true,
                diner: false
            });
        expect(res.status).toBe(201);
    })
    it('user must have a role at registration', async () => {
        const res = await request(server)
            .post('/api/register')
            .send({
                username: "testUser",
                password: "pwd123",
                email: "email@string.com",
                operator: false,
                diner: false
            });
        expect(res.status).toBe(400);
    })
    it('username must be unique', async () => {
        const res = await request(server)
            .post('/api/register')
            .send({
                username: "diner01", //from seed data
                password: "pwd123",
                email: "email@string.com",
                operator: false,
                diner: true
            });
        expect(res.status).toBe(404);
    })
    it('registration returns correct information', async () => {
        const res = await request(server)
            .post('/api/register')
            .send({
                username: "testUser",
                password: "pwd123",
                email: "email@string.com",
                operator: true,
                diner: false
            });
        expect(res.status).toBe(201);
        expect(Object.keys(res.body.data)).toHaveLength(6);
        expect(res.body.data).toMatchObject({
            id: 5,
            username: "testUser",
            // password: hashed pw
            email: "email@string.com",
            operator: true,
            diner: false
        });
        expect(res.body.data).toHaveProperty("password");
    })
})

describe('POST to api/login', () => {
    it('cannot log an invalid user in', async () => {
        const register = await request(server)
            .post('/api/register')
            .send({
                username: "testUser",
                password: "pwd123",
                email: "email@string.com",
                operator: true,
                diner: false
            });
        const login = await request(server)
            .post("/api/login")
            .send({
                username: "testUser2",
                password: "321dwp"
            });
        expect(login.status).toBe(401);
        expect(login.body).toMatchObject({ message: 'Invalid credentials.' })
    })
    it('can log a user in and has correct information', async () => {
        const register = await request(server)
            .post('/api/register')
            .send({
                username: "testUser2",
                password: "pwd123",
                email: "email@string.com",
                operator: true,
                diner: false
            });
        const login = await request(server)
            .post("/api/login")
            .send({
                username: "testUser2",
                password: "pwd123"
            });
        expect(login.status).toBe(200);
        expect(login.body).toMatchObject({ message: 'Access granted.' })
        expect(login.body).toHaveProperty("token");

        
    })
})
