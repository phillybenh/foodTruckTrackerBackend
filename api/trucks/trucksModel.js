const db = require('../../database/dbConfig');

module.exports = {
    find,
    findQuery,
    findBy,
    findById,
    findMenuById,
    findMenuItemById,
    add,
    insertMenu,
    update,
    updateMenu,
    remove,
    removeMenuItem,
    insertLocation,
    updateLocation
}

function find() {
    return db("trucks as t")
        .select("t.id as truck_id", "t.user_id as operator_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg")
        .orderBy("t.id")

}

function findQuery(query) {
    return db("trucks as t")
        .select("t.id as truck_id", "t.user_id as operator_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg")
        .where(query)
        .orderBy("t.id")

}

function findBy(filter) {
    return db("trucks as t")
        .where(filter)
    // .select("u.id as user_id", "u.username", "u.password")
    // .orderBy("u.id");
}

function findById(id) {
    return db("trucks as t")
        .leftJoin("location as l", "t.id", "l.truck_id")
        .select("t.id as truck_id", "t.user_id as operator_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg", "l.id as location_id", "l.currentLocationDescription as currentLocation", "l.currentDepartureTime", "l.nextLocationDescription", "l.nextArrivalTime", "l.nextDepartureTime")
        .where("t.id", id)
        .first();
}

function findMenuById(id) {
    return db("menus as m")
        // .select("t.id as truck_id", "t.user_id as operator_id", "t.truckName", "t.imageOfTruck", "t.cuisineType", "t.customerRatingAvg")
        .where("m.truck_id", id)
    // .first();
}

function findMenuItemById(id) {
    return db("menus as m")
        .where("m.id", id)
        .first()
}

function add(truck) {
    return db('trucks')
        .insert(truck, 'id')
        .then(([id]) => findById(id));
}

function insertMenu(menu, truck_id) {
    menu.truck_id = truck_id
    return db('menus')
        .insert(menu, 'id')
        .then(([id]) => findMenuById(truck_id));
}

function update(changes, id) {
    return db("trucks")
        .where({ id })
        .update(changes)
        .then(res => {
            return findById(id);
        });
};

function updateMenu(changes, menu_id, truck_id) {
    return db("menus")
        .where({ id: menu_id })
        .update(changes)
        .then(res => {
            return findMenuById(truck_id);
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
                    return db("menus as m")
                        .where("m.truck_id", id)
                        .del()
                        .then(res => {
                            return delObj;
                        });
                });
        })
};

function removeMenuItem(id) {
    return findMenuItemById(id)
        .then(resp => {
            const delObj = resp;
            return db("menus as m")
                .where("m.id", id)
                .del()
                .then(res => {
                    return delObj;
                });
        })
};

function insertLocation(location, truck_id) {
    location.truck_id = truck_id
    return db('location')
        .insert(location, 'id')
        .then(([id]) => findById(truck_id));
}

function updateLocation(changes,  truck_id, location_id) {
    return db("location")
        .where({ id: location_id })
        .update(changes)
        .then(res => {
            return findById(truck_id);
        });
};