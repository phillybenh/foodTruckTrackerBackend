const request = require("supertest");
const server = require("../server");
const testDBReset = require("../../helpers/testDBReset");

// setup mocked authentication
const restrict = require("../auth/authenticationMiddleware");
jest.mock("../auth/authenticationMiddleware");

// reset the database before each test run         
beforeEach(testDBReset);

describe('trucks with mocked login', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })
    it('GET request to /api/trucks returns correct object', async () => {
        const res = await request(server)
            .get("/api/trucks")
        expect(restrict).toBeCalled();
        expect(res.body.data[1]).toMatchObject({
            truck_id: 2,
            operator_id: 4,
            truckName: 'Soup to Go!',
            imageOfTruck: 'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.',
            cuisineType: 'soup',
            customerRatingAvg: 55.67
        })
    })
    it('GET request to /api/trucks/:id returns correct object', async () => {
        const res = await request(server)
            .get("/api/trucks/2")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body.data).toMatchObject({
            truck_id: 2,
            operator_id: 4,
            truckName: 'Soup to Go!',
            imageOfTruck: 'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.',
            cuisineType: 'soup',
            customerRatingAvg: 55.67
        })
    })
    it('GET request to /api/trucks/:id/menu returns correct object', async () => {
        const res = await request(server)
            .get("/api/trucks/2/menu")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            data: [
                {
                    id: 2,
                    truck_id: 2,
                    itemName: 'Chicken Soup',
                    itemDescription: "It's good soup",
                    itemPhotos: null,
                    itemPrice: 9.88,
                    customerRatings: [
                        82.2,
                        47
                    ],
                    customerRatingAvg: 64.6
                },
                {
                    id: 3,
                    truck_id: 2,
                    itemName: 'Beef Barley',
                    itemDescription: null,
                    itemPhotos: null,
                    itemPrice: 10.88,
                    "customerRatings": [
                        99,
                        82.2,
                        50
                    ],
                    customerRatingAvg: 77.06
                }
            ]
        })
    })
})