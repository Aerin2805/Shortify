const mongoose = require("mongoose");

const ConnectDB = (DB_URL) => {
    mongoose.connect(DB_URL).then(() => {
        console.log("Database Connected Successfully");
    }).catch((err) => {
        console.log("Database Connection Error", err);
    })
}

module.exports = ConnectDB;