
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 255).unique().notNullable();
            tbl.string('password', 255).notNullable();
            tbl.string('email', 255).notNullable();
            tbl.boolean('operator').defaultTo(false).notNullable();
            tbl.boolean('diner').defaultTo(true).notNullable();
        })
        .createTable('dinerProfile', tbl => {
            tbl.increments();
            tbl
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('currentLocation', 255).notNullable();
            tbl.integer('radSize').defaultTo(5).notNullable(); // for local truck searching in miles
            tbl.string('bio')
        })
        .createTable('trucks', tbl => {
            tbl.increments();
            tbl
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE'); // owners id
            tbl.string('truckName', 255).unique().notNullable();
            tbl.string('imageOfTruck'); // for image URL
            tbl.string('cuisineType', 255).notNullable();
            tbl.float('customerRatingAvg');
        })
        .createTable('diner_trucks', tbl => {
            // tbl.increments(); handled by .primary
            tbl.primary(['profile_id', 'truck_id']);
            tbl
                .integer('profile_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('dinerProfile')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl
                .integer('truck_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('trucks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.float('customerRating').notNullable();
            tbl.string('customerReview');
            tbl.boolean('favoriteTruck').defaultTo(false).notNullable();
        })
        .createTable('menus', tbl => {
            tbl.increments();
            tbl
                .integer('truck_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('trucks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE'); // owners id
            tbl.string('itemName', 255).notNullable();
            tbl.string('itemDescription', 255);
            tbl.string('itemPhotos', 255);
            tbl.float('itemPrice').notNullable();
            // unsure which is best method
            // tbl.json('customerRatings');
            tbl.specificType('customerRatings', 'float[]')
            tbl.float('customerRatingAvg');
        })
        .createTable('location', tbl => {
            tbl.increments();
            tbl
                .integer('truck_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('trucks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE'); // owners id
            tbl.string('currentLocation', 255).notNullable();
            tbl.datetime('currentDepartureTime').notNullable();
            tbl.string('nextLocation', 255);
            tbl.datetime('nextArrivalTime');
            tbl.datetime('nextDepartureTime');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('location')
        .dropTableIfExists('menus')
        .dropTableIfExists('diner_trucks')
        .dropTableIfExists('trucks')
        .dropTableIfExists('dinerProfile')
        .dropTableIfExists('users')
};
