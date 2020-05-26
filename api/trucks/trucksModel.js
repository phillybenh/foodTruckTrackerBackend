const db = require('../../database/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    insert,
    update,
    remove
}

function find() {
    return db("trucks as t")
        .select("t.id as truck_id", "t.user_id as operator_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg")

}

function findBy(filter) {
    console.log("filter", filter);
    return db("trucks as t")
        .where(filter)
    // .select("u.id as user_id", "u.username", "u.password")
    // .orderBy("u.id");
}

function findById(id) {
    return db("trucks as t")
        .select("t.id as truck_id", "t.user_id as operator_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg")
        .where("t.id", id)
        .first();
}

function insert(truck) {
    return db('trucks')
        .insert(truck, 'id')
        .then(([id]) => findById(id));
}

function update(changes, id) {
    return db("trucks")
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
            return db("trucks as t")
                .where("t.id", id)
                .del()
                .then(res => {
                    return delObj;
                });
        })
};