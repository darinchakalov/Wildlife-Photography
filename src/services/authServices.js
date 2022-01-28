const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config/constants.js");

const register = function (firstName, lastName, email, password) {
	return User.create({ firstName, lastName, email, password });
};

const login = async function (email, password) {
	try {
		let user = await User.findOne({ email: email });
		let isPassCorrect = await user.confirmPass(password);
		if (isPassCorrect) {
			return user;
		}
	} catch (error) {
		return error;
	}
};

const createToken = function (user) {
	const payload = {
		id: user._id,
		username: user.username,
		email: user.email,
	};
	return jwt.sign(payload, SECRET);
};

const getUser = function (id) {
	return User.findOne({ _id: id });
};

const authServices = {
	register,
	login,
	createToken,
	getUser,
};

module.exports = authServices;
