
exports.seed = function (knex) {
  return knex('trucks')
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {
          user_id: 1,
          truckName: 'Grilled Cheese Truck',
          imageOfTruck: "https://images.unsplash.com/photo-1513640127641-49ba81f8305c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
          cuisineType: 'sammy',
          customerRatingAvg: 78.3
        },
        {
          user_id: 1,
          truckName: 'Soup to Go!',
          imageOfTruck: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.",
          cuisineType: 'soup',
          customerRatingAvg: 55.67
        },
      ]);
    });
};
