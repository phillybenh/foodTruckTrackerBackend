
exports.seed = function (knex) {
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'diner01',
          password: 'Password123!@#',
          email: "testEmal@aol.com",
          operator: false,
          diner: true,
        },
        {
          username: 'operator01',
          password: 'Password123!@#',
          email: "testEmal@aol.com",
          operator: true,
          diner: false,
        },
        {
          username: 'diner02',
          password: 'Password123!@#',
          email: "testEmal@aol.com",
          operator: false,
          diner: true,
        },
        {
          username: 'operator02',
          password: 'Password123!@#',
          email: "testEmal@aol.com",
          operator: true,
          diner: false,
        },

      ]);
    });
};
