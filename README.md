# Food Truck Tracker

## Lambda School Build-week Project

This is the backend for the Food Truck Tracker web application.

## The Food Truck Tracker Project

<!-- - Marketing Page:
  - Repo: https://github.com/2foodtrucktrackr/marketing
  - Deployed: TBD
- Web Application Page:
  - Repo: https://github.com/2foodtrucktrackr/frontend
  - Deployed: TBD -->

### Pitch

  "Every true "foodie" worth their salt knows that some of the best food in any city can be found on food trucks - but knowing when and where those trucks will be can be next to impossible, and discovering new ones often relies on word-of-mouth that is long on tales of delicious, but short on actual details.

  FoodTruck TrackR was designed to make finding and eating at a food truck fast, easy and fun. Quickly see all of our Operator partners' nearby food trucks that currently open, view their current real-time GPS location, know the scheduled arrival and departure times, view photos, read customer reviews and much more, all in our easy to use app. Try FoodTruck TrackR today, and enjoy the best food YOUR city has to offer."

- Requirements: <https://www.notion.so/FoodTruck-TrackR-7693a673dbe047f2beb489128da25a86>
- Product Vision Document: <https://docs.google.com/document/d/1Xd1IQxF1YnggtbPlE42lUtCFjzatEmxP9YJe273NV0Y/edit?pli=1>

- Backend:
  - Postman Documentation: <https://documenter.getpostman.com/view/11274891/SztD4n16?version=latest>
  - Repo: <https://github.com/phillybenh/foodTruckTrackerBackend>
  - Base URL: <https://foodspy.herokuapp.com/>

## Database Schema

![initial schema draft](https://lh3.googleusercontent.com/pw/ACtC-3eygg48nsFTMv7iBopuWGQyEPbGPucsBfDqWpL039s0NmEPQcWhyQemo4o_YPq-4o0PSXZ8eSZT6V_YgsJFnUfR9KY4D98H5a1pPDuw4Sp7vObdXtUAaFBqHXG2K-rEfEhqSD62wGZSdfQY9Of1-_K-wA=w1293-h1044-no?authuser=0 "Food Truck Tracker Schema")

## API Information

- To return food trucks of a specific cuisine type, use a query string in the URL, example:

  - `/api/trucks?cuisineType=soup`

- User registration POST request JSON object example:

  ```JSON
  {
    "username": "uniqueUser",
    "password": "passwordString",
    "email": "email@address.com",
    "operator": false,
    "diner": true
  }
  ```

- User profile POST request JSON object example:

  ```JSON
  {
    "firstName": "First",
    "lastName": "Last",
    "profileImageUrl": "string", // or null
    "currentStreetAddress": "123 Profile St.",
    "currentCity": "Profileville",
    "currentState": "PA",
    "currentZipCode": 19147,
    "radSize": 6,
    "bio": "string" // or null
  }
  ```

- Food truck POST request JASON object example:

  ```JSON
  {
    "user_id": 10,
    "truckName": "Truck Name String",
    "imageOfTruck": "URL string", // can be null
    "cuisineType": "cuisine string"
  }
  ```

- Menu item POST request JSON object example:

  ```JSON
  {
    "itemName": "Item Name String!",
    "itemDescription": "Item description string",
    "itemPhotos": "URL String", // or null
    "itemPrice": 4.88, // number required
    "customerRatings": [66, 78, 74], // or null
    "customerRatingAvg: 72.6667 // or null
  }
  ```

- Location POST request JSON object example (all 'next...' keys are optional):

  ```JSON
  {
   "currentLocationDescription": "Penn Treaty Park",
    "currentStreetAddress": "1301 N Beach St",
    "currentCity": "Philadelphia",
    "currentState": "PA",
    "currentZipCode": 19125,
    "currentDepartureTime": "2020-05-30 18:00:00 -5:00",
    "nextLocationDescription": "Clarke Park",
    "nextStreetAddress": "4398 Baltimore Ave",
    "nextCity": "Philadelphia",
    "nextState": "PA",
    "nextZipCode": 19104,
    "nextArrivalTime": "2020-05-31 12:00:00 -5:00",
    "nextDepartureTime": "2020-05-31 18:00:00 -5:00"
  }
  ```

### Endpoints

| ACCESS        | Method | URL           | TESTED |
| :------------ | :----- | :------------ | :----- |
| Login as user | POST   | /api/login    | ✅     |
| Add a user    | POST   | /api/register | ✅     |

| USERS                   | Method | URL                           | TESTED |
| :---------------------- | :----- | :---------------------------- | :----- |
| Get a list of users     | GET    | /api/users                    | ✅     |
| Get a list of diners    | GET    | /api/users/diners             | ✅     |
| Get a list of operators | GET    | /api/users/operators          | ✅     |
| Add a user profile      | POST   | /api/users/:id                | ✅     |
| Get a user profile      | GET    | /api/users/:id                | ✅     |
| Edit a user profile     | PUT    | /api/users/:id                | ✅     |
| Delete a user           | DELETE | /api/users/:id                | ✅     |
| Get a favorite trucks   | GET    | /api/users/:id/favoriteTrucks | ✅     |
| Get a owned trucks      | GET    | /api/users/:id/trucksOwned    | ✅     |

| TRUCKS              | Method | URL                                   | TESTED |
| :------------------ | :----- | :------------------------------------ | :----- |
| Add truck           | POST   | /api/trucks                           | ✅     |
| Get trucks          | GET    | /api/trucks                           | ✅     |
| Get truck           | GET    | /api/trucks/:id                       | ✅     |
| Edit truck          | PUT    | /api/trucks/:id                       | ✅     |
| Delete trucks       | DELETE | /api/trucks/:id                       | ✅     |
| Add truck menu      | POST   | /api/trucks/:id/menu                  | ✅     |
| Get truck menu      | GET    | /api/trucks/:id/menu                  | ✅     |
| Edit truck menu     | PUT    | /api/trucks/:id/menu/:item_id         | ✅     |
| Delete truck menu   | DELETE | /api/trucks/:id/menu/:item_id         | ✅     |
| Add truck location  | POST   | /api/trucks/:id/location              | ✅     |
| Edit truck location | PUT    | /api/trucks/:id/location/:location_id | ✅     |
