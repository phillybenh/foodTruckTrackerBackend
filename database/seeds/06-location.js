
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('location').del()
    .then(function () {
      // Inserts seed entries
      return knex('location').insert([
        { 
          truck_id: 1,
          currentLocationDescription: "The Park by the river",
          currentStreetAddress: "123 Dock St.",
          currentCity: "Philadelphia",
          currentState: "PA",
          currentZipCode: 19147,
          currentDepartureTime: "2020-05-30 18:05:06 -5:00",
          nextLocationDescription: null,
          nextStreetAddress: null,
          nextCity: null,
          nextState: null,
          nextZipCode: null,
          nextArrivalTime: null,
          nextDepartureTime: null,

        },
        { 
          truck_id: 2,
          currentLocationDescription: "The Park by the river",
          currentStreetAddress: "123 Dock St.",
          currentCity: "Philadelphia",
          currentState: "PA",
          currentZipCode: 19147,
          currentDepartureTime: "2020-05-30 18:00:00 -5:00",
          nextLocationDescription: "The Park by the river",
          nextStreetAddress: "123 Dock St.",
          nextCity: "Philadelphia",
          nextState: "PA",
          nextZipCode: 19147,
          nextArrivalTime: "2020-05-31 12:00:00 -5:00",
          nextDepartureTime: "2020-05-31 18:00:00 -5:00",

        },
      ])
    });
};
