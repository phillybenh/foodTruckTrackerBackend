const request = require("supertest");
const server = require("../server");
const testDBReset = require("../../helpers/testDBReset");

// reset the database before each test run
beforeEach(testDBReset);

describe('users', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })

    describe('GET attempt without login', () => {
        it('rejects our advances with NO auth info', async () => {
            const res = await request(server)
                .post('/api/users')
            expect(res.status).toBe(400);
        })
        it('rejects our advances with BAD auth info', async () => {
            const res = await request(server)
                .post('/api/users')
                .set("authorization", { token: "liyug867t" })
            expect(res.status).toBe(401);
        })
    })
    describe('GET users while logged in', () => {

        it('returns OK status and correct length object', async () => {
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
            const res = await request(server)
                .get("/api/users")
                .set("authorization", login.body.token);
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveLength(5);
        })
    })
    describe('user profile', () => {
        it('can edit a profile', async () => {
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
            const res = await request(server)
                .post("/api/users/5")
                .set("authorization", login.body.token)
                .send({
                    "firstName": "Ben",
                    "lastName": "Haus",
                    "profileImageUrl": null,
                    "currentStreetAddress": "1755 Ellsworth St.",
                    "currentCity": "Philadelphia",
                    "currentState": "PA",
                    "currentZipCode": 19146,
                    "radSize": 6,
                    "bio": null
                });
            expect(res.status).toBe(201);
            expect(res.body.data).toMatchObject({
                user_id: 5,
                username: 'testUser2',
                email: 'email@string.com',
                operator: true,
                truckName: null,
                diner: false,
                profile_id: 5,
                firstName: 'Ben',
                lastName: 'Haus',
                profileImageUrl: null,
                currentStreetAddress: '1755 Ellsworth St.',
                currentCity: 'Philadelphia',
                currentState: 'PA',
                currentZipCode: 19146,
                radSize: 6,
                bio: null
            })
        })
        it('can post, edit, and delete a profile', async () => {
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
            const resPost = await request(server)
                .post("/api/users/5")
                .set("authorization", login.body.token)
                .send({
                    "firstName": "Ben",
                    "lastName": "Haus",
                    "profileImageUrl": null,
                    "currentStreetAddress": "1755 Ellsworth St.",
                    "currentCity": "Philadelphia",
                    "currentState": "PA",
                    "currentZipCode": 19146,
                    "radSize": 6,
                    "bio": null
                });
            const resPut = await request(server)
                .put("/api/users/5")
                .set("authorization", login.body.token)
                .send({
                    "firstName": "Kelli",
                    "lastName": "Klein",
                    "profileImageUrl": null,
                    "currentStreetAddress": "1755 Ellsworth St.",
                    "currentCity": "Philadelphia",
                    "currentState": "PA",
                    "currentZipCode": 19146,
                    "radSize": 6,
                    "bio": null
                });
            const resDel = await request(server)
                .delete("/api/users/5")
                .set("authorization", login.body.token);
            expect(resPost.status).toBe(201);
            expect(resPost.body.data).toMatchObject({
                user_id: 5,
                username: 'testUser2',
                email: 'email@string.com',
                operator: true,
                truckName: null,
                diner: false,
                profile_id: 5,
                firstName: 'Ben',
                lastName: 'Haus',
                profileImageUrl: null,
                currentStreetAddress: '1755 Ellsworth St.',
                currentCity: 'Philadelphia',
                currentState: 'PA',
                currentZipCode: 19146,
                radSize: 6,
                bio: null
            })
            expect(resPut.status).toBe(200);
            expect(resPut.body.data).toMatchObject({
                user_id: 5,
                username: 'testUser2',
                email: 'email@string.com',
                operator: true,
                truckName: null,
                diner: false,
                profile_id: 5,
                firstName: 'Kelli',
                lastName: 'Klein',
                profileImageUrl: null,
                currentStreetAddress: '1755 Ellsworth St.',
                currentCity: 'Philadelphia',
                currentState: 'PA',
                currentZipCode: 19146,
                radSize: 6,
                bio: null
            })
            expect(resDel.body.removed).toMatchObject({
                user_id: 5,
                username: 'testUser2',
                email: 'email@string.com',
                operator: true,
                truckName: null,
                diner: false,
                profile_id: 5,
                firstName: 'Kelli',
                lastName: 'Klein',
                profileImageUrl: null,
                currentStreetAddress: '1755 Ellsworth St.',
                currentCity: 'Philadelphia',
                currentState: 'PA',
                currentZipCode: 19146,
                radSize: 6,
                bio: null
            })
        })
    })
})
// console.log("status", res.status)
// console.log("body", res.body)