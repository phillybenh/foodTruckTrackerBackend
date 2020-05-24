
exports.seed = function (knex) {
  return knex('dinerProfile')
    .then(function () {
      // Inserts seed entries
      return knex('dinerProfile').insert([
        {
          user_id: 1,
          firstName: "Bob",
          lastName: "H",
          profileImageUrl: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80",
          currentStreetAddress: "123 Front St.",
          currentCity: "San Diego",
          currentState: "CA",
          currentZipCode: 12345,
          radSize: 5,
        },
        {
          user_id: 2,
          firstName: "Karen",
          lastName: "M",
          profileImageUrl: null,
          currentStreetAddress: "123 Back St.",
          currentCity: "New York",
          currentState: "NY",
          currentZipCode: 12345,
          radSize: 5,
          bio: "Come to my truck and speak to me, the manager."
        },
        {
          user_id: 3,
          firstName: "Stu",
          lastName: "Spellman",
          profileImageUrl: null,
          currentStreetAddress: "321 Front St.",
          currentCity: "Mobile",
          currentState: "LA",
          currentZipCode: 12345,
          // radSize: 5,
          bio: "I'm stu and food trucks are my jam"
        },
        {
          user_id: 4,
          firstName: "Kelli",
          lastName: "Martincic",
          profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80",
          currentStreetAddress: "333 Main St.",
          currentCity: "Nowhere",
          currentState: "KS",
          currentZipCode: 12345,
          radSize: 5,
          bio: ""
        }
      ]);
    });
};
