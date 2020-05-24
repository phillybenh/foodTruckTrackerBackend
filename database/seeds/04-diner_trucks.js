
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('diner_trucks')
    .then(function () {
      // Inserts seed entries
      return knex('diner_trucks').insert([
        { 
          profile_id: 1,
          truck_id: 1,
          customerRating: 87.4,
          customerReview: "This truck is hot!",
          favoriteTruck: false
        },
        { 
          profile_id: 1,
          truck_id: 2,
          customerRating: 87.4,
          customerReview: "This truck is hot!",
          favoriteTruck: true
        },
        { 
          profile_id: 3,
          truck_id: 1,
          customerRating: 87.4,
          customerReview: "This truck is hot!",
          favoriteTruck: true
        }
      ]);
    });
};
