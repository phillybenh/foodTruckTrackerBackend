const db = require('../../database/dbConfig');

module.exports = {
    add,
    find,
    findDiners,
    findOperators,
    findBy,
    findById,
    update,
    remove,
    favTrucks,
    findTrucks,
};

function find() {
    return db("users as u")
        .leftJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .leftJoin("trucks as t", "u.id", "t.user_id")
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "t.truckName", "u.diner", "dp.firstName", "dp.lastName", "dp.profileImageUrl", "dp.currentStreetAddress", "dp.currentCity", "dp.currentState", "dp.currentZipCode", "dp.radSize", "dp.bio")
        .orderBy("u.id")
}
function findDiners() {
    return db("users as u")
        .fullOuterJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .where("u.diner", true)
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "u.diner", "dp.firstName", "dp.lastName", "dp.profileImageUrl", "dp.currentStreetAddress", "dp.currentCity", "dp.currentState", "dp.currentZipCode", "dp.radSize", "dp.bio")
        .orderBy("u.id")

}
function findOperators() {
    return db("users as u")
        .fullOuterJoin("trucks as t", "u.id", "t.user_id")
        .where("u.operator", true)
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "t.truckName")
        .orderBy("u.id")

}


function findBy(filter) {
    return db("users as u")
        .where(filter)
        .select("u.id as user_id", "u.username", "u.password")
        .orderBy("u.id");
}

function findById(id) {
    return db("users as u")
        .leftJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .leftJoin("trucks as t", "u.id", "t.user_id")
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "t.truckName", "u.diner", "dp.id as profile_id", "dp.firstName", "dp.lastName", "dp.profileImageUrl", "dp.currentStreetAddress", "dp.currentCity", "dp.currentState", "dp.currentZipCode", "dp.radSize", "dp.bio")
        .where("u.id", id)
        .first();
}

function add(profile, user_id) {
    profile.user_id = user_id
    return db('dinerProfile')
        .insert(profile, 'id')
        .then(([id]) => findById(id));
}

function update(changes, id) {
    return db("dinerProfile")
        .where({ id })
        .update(changes)
        .then(res => {
            return findById(id);
        });
};

function remove(id) {
    return findById(id)
        .then(resp => {
            const delObj = resp;
            return db("dinerProfile as dp")
                .where("dp.user_id", id)
                .del()
                .then(res => {
                    return db("users as u")
                        .where("u.id", id)
                        .del()
                        .then(res => {
                            return delObj;
                        });
                });
        })
};

function favTrucks(id) {
    return findById(id)
        .then(resp => {
            const profile = resp;
            return db("diner_trucks as dt")
                .join("trucks as t", "dt.truck_id", "t.id")
                .select("dt.truck_id", "t.truckName")
                .where("dt.profile_id", profile.profile_id)
                .where("favoriteTruck", true)
        })
}

function findTrucks(id) {
    return db("trucks as t")
        .select("t.id as truck_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg")
        .where("t.user_id", id)
}