
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('menus')
    .then(function () {
      // Inserts seed entries
      return knex('menus').insert([
        {
          truck_id: 1,
          itemName: "Grilled Cheese",
          itemDescription: "3 cheeses, crispy bread, etc.",
          itemPhotos: null,
          itemPrice: 8.88,
          customerRatings: [99, 82.2, 47],
          customerRatingAvg: 76.06
        },
        {
          truck_id: 2,
          itemName: "Chicken Soup",
          itemDescription: "It's good soup",
          itemPhotos: null,
          itemPrice: 9.88,
          customerRatings: [82.2, 47],
          customerRatingAvg: 64.6
        },
        {
          truck_id: 2,
          itemName: "Beef Barley",
          itemDescription: null,
          itemPhotos: null,
          itemPrice: 10.88,
          customerRatings: [99, 82.2, 50],
          customerRatingAvg: 77.06
        },
      ]);
    });
};
