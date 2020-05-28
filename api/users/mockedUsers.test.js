const request = require("supertest");
const server = require("../server");
const testDBReset = require("../../helpers/testDBReset");

// setup mocked authentication
const restrict = require("../auth/authenticationMiddleware");
jest.mock("../auth/authenticationMiddleware");

// reset the database before each test run         

beforeEach(testDBReset);

describe('users with mocked login', () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    })
    it('get all users returns the correct info', async () => {
        const res = await request(server)
            .get("/api/users")
        expect(restrict).toBeCalled();
        expect(res.body.data[0]).toMatchObject({
            user_id: 1,
            username: 'diner01',
            email: 'testEmal@aol.com',
            operator: false,
            truckName: null,
            diner: true,
            firstName: 'Bob',
            lastName: 'H',
            profileImageUrl: 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80',
            currentStreetAddress: '123 Front St.',
            currentCity: 'San Diego',
            currentState: 'CA',
            currentZipCode: 12345,
            radSize: 5,
            bio: null
        })
    })
    it('/api/users/diners returns the correct information', async () => {
        const res = await request(server)
            .get("/api/users/diners")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
    })
    it('/api/users/operators returns the correct information', async () => {
        const res = await request(server)
            .get("/api/users/operators")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
    })
    it('/api/users/:id', async () => {
        const res = await request(server)
            .get("/api/users/2")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body.data).toMatchObject({
            user_id: 2,
            username: 'operator01',
            email: 'testEmal@aol.com',
            operator: true,
            truckName: 'Grilled Cheese Truck',
            diner: false,
            profile_id: 2,
            firstName: 'Karen',
            lastName: 'M',
            profileImageUrl: null,
            currentStreetAddress: '123 Back St.',
            currentCity: 'New York',
            currentState: 'NY',
            currentZipCode: 12345,
            radSize: 5,
            bio: 'Come to my truck and speak to me, the manager.'
        })
    })
    it('/api/users/:id/favoriteTrucks', async () => {
        const res = await request(server)
            .get("/api/users/1/favoriteTrucks")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toMatchObject({
            truck_id: 2,
            truckName: 'Soup to Go!'
        })
    })
    it('/api/users/:id/trucksOwned', async () => {
        const res = await request(server)
            .get("/api/users/2/trucksOwned")
        expect(restrict).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toMatchObject({
            truck_id: 1,
            truckName: 'Grilled Cheese Truck',
            imageOfTruck: 'https://images.unsplash.com/photo-1513640127641-49ba81f8305c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
            cuisineType: 'sammy',
            customerRatingAvg: 78.3
        }
        )
    })
})