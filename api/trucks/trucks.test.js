const request = require("supertest");
const server = require("../server");
const testDBReset = require("../../helpers/testDBReset");

// reset the database before each test run
beforeEach(testDBReset);

describe('trucks', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })

    describe('GET attempt without login', () => {
        it('rejects our advances with NO auth info', async () => {
            const res = await request(server)
                .post('/api/trucks')
            expect(res.status).toBe(400);
        })
        it('rejects our advances with BAD auth info', async () => {
            const res = await request(server)
                .post('/api/trucks')
                .set("authorization", { token: "liyug867t" })
            expect(res.status).toBe(401);
        })
    })
    describe('GET trucks while logged in', () => {
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
                .get("/api/trucks")
                .set("authorization", login.body.token);
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveLength(2);
        })
    })
    describe('POST/PUT/DELETE trucks while logged in', () => {
        it('cannot POST truck with incorrect user_id', async () => {
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
            const create = await request(server)
                .post("/api/trucks")
                .send({
                    "user_id": 6,
                    "truckName": "Truck!",
                    "imageOfTruck": null,
                    "cuisineType": "Pizza"
                })
                .set("authorization", login.body.token);
            expect(create.status).toBe(401);
        })

        it('can POST PUT and DELETE a truck', async () => {
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
            const create = await request(server)
                .post("/api/trucks")
                .send({
                    "user_id": 5,
                    "truckName": "Truck!",
                    "imageOfTruck": null,
                    "cuisineType": "Pizza"
                })
                .set("authorization", login.body.token);
            const update = await request(server)
                .put("/api/trucks/3")
                .send({
                    "user_id": 5,
                    "truckName": "The Ultimate Truck!",
                    "imageOfTruck": null,
                    "cuisineType": "Tacos"
                })
                .set("authorization", login.body.token);
            const delTruck = await request(server)
                .delete("/api/trucks/3")
                .set("authorization", login.body.token);
            expect(create.status).toBe(200);
            expect(create.body.data).toMatchObject({
                truck_id: 3,
                operator_id: 5,
                truckName: 'Truck!',
                imageOfTruck: null,
                cuisineType: 'Pizza',
                customerRatingAvg: null
            })
            expect(update.status).toBe(200);
            expect(update.body.data).toMatchObject({
                truck_id: 3,
                operator_id: 5,
                truckName: 'The Ultimate Truck!',
                imageOfTruck: null,
                cuisineType: 'Tacos',
                customerRatingAvg: null
            })
            expect(delTruck.body).toMatchObject({
                removed: {
                    truck_id: 3,
                    operator_id: 5,
                    truckName: 'The Ultimate Truck!',
                    imageOfTruck: null,
                    cuisineType: 'Tacos',
                    customerRatingAvg: null
                }
            })
        })
    })
    describe('Menu Items', () => {
        it('can POST PUT and DELETE a menu item for a truck', async () => {
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
            const createTruck = await request(server)
                .post("/api/trucks")
                .send({
                    "user_id": 5,
                    "truckName": "Truck!",
                    "imageOfTruck": null,
                    "cuisineType": "Pizza"
                })
                .set("authorization", login.body.token);
            const create = await request(server)
                .post("/api/trucks/3/menu")
                .send({
                    "itemName": "sushi!",
                    "itemDescription": "the best",
                    "itemPhotos": null,
                    "itemPrice": 4.88,
                    "customerRatings": null
                })
                .set("authorization", login.body.token);
            const update = await request(server)
                .put("/api/trucks/3/menu/4")
                .send({
                    "itemName": "Carnitas Tacos",
                    "itemDescription": "the best",
                    "itemPhotos": null,
                    "itemPrice": 8.88,
                    "customerRatings": [98, 88],
                    "customerRatingAvg": 93,
                })
                .set("authorization", login.body.token);
            const delTruck = await request(server)
                .delete("/api/trucks/3/menu/4")
                .set("authorization", login.body.token);
            expect(create.status).toBe(200);
            expect(create.body.data[0]).toMatchObject({
                id: 4,
                truck_id: 3,
                itemName: 'sushi!',
                itemDescription: 'the best',
                itemPhotos: null,
                itemPrice: 4.88,
                customerRatings: null,
                customerRatingAvg: null
            })
            expect(update.status).toBe(200);
            expect(update.body.data[0]).toMatchObject({
                id: 4,
                truck_id: 3,
                itemName: 'Carnitas Tacos',
                itemDescription: 'the best',
                itemPhotos: null,
                itemPrice: 8.88,
                customerRatings: [98, 88],
                customerRatingAvg: 93
            })
            expect(delTruck.body).toMatchObject({
                removed: {
                    id: 4,
                    truck_id: 3,
                    itemName: 'Carnitas Tacos',
                    itemDescription: 'the best',
                    itemPhotos: null,
                    itemPrice: 8.88,
                    customerRatings: [98, 88],
                    customerRatingAvg: 93
                }
            })
        })
    })
})