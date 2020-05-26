const db = require('../../database/dbConfig');

module.exports = {
    add,
    find,
    findDiners,
    findOperators,
    findBy,
    findById,
    insert,
    update,
    remove
};

function find() {
    return db("users as u")
        .fullOuterJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .fullOuterJoin("trucks as t", "u.id", "t.user_id")
        // .fullOuterJoin("diner_trucks as dt", "dp.id", "dt.profile_id")
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "t.truckName", "u.diner", "dp.firstName", "dp.lastName", "dp.profileImageUrl", "dp.currentStreetAddress", "dp.currentCity", "dp.currentState", "dp.currentZipCode", "dp.radSize", "dp.bio")
}
function findDiners() {
    return db("users as u")
        .fullOuterJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .where("u.diner", true)
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "u.diner", "dp.firstName", "dp.lastName", "dp.profileImageUrl", "dp.currentStreetAddress", "dp.currentCity", "dp.currentState", "dp.currentZipCode", "dp.radSize", "dp.bio")
}
function findOperators() {
    return db("users as u")
        // .fullOuterJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .fullOuterJoin("trucks as t", "u.id", "t.user_id")
        .where("u.operator", true)
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "t.truckName")
}


function findBy(filter) {
    // console.log("filter", filter);
    return db("users as u")
        .where(filter)
        .select("u.id as user_id", "u.username", "u.password")
        .orderBy("u.id");
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("users as u")
        .fullOuterJoin("dinerProfile as dp", "u.id", "dp.user_id")
        .fullOuterJoin("trucks as t", "u.id", "t.user_id")
        // .fullOuterJoin("diner_trucks as dt", "dp.id", "dt.profile_id")
        .select("u.id as user_id", "u.username", "u.email", "u.operator", "t.truckName", "u.diner", "dp.firstName", "dp.lastName", "dp.profileImageUrl", "dp.currentStreetAddress", "dp.currentCity", "dp.currentState", "dp.currentZipCode", "dp.radSize", "dp.bio")
    .where("u.id", id)
    .first();
}

function insert(profile, user_id) {
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
                        console.log(delObj)
                        return delObj;
                    });
                });
        })
};


