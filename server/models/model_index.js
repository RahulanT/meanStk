const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./User");
db.Trade = require("./Trade");

db.roles = ["user", "admin", "moderator"];

module.exports = db;

