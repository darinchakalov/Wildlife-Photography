const mongoose = require("mongoose");

const { DB_STRING } = require("../config/constants.js");

const initDB = () => {
	return mongoose.connect(DB_STRING);
};

module.exports = initDB;
