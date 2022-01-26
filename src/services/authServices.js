const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config/constants.js");

const register = function (firstName, lastName, email, password) {
	return User.create({ firstName, lastName, email, password });
};

const login = async function (email, password) {
	try {
		let user = await User.find({ email: email });
		let isPassCorrect = await User.confirmPass(password);
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
	jwt.sign(payload, SECRET, function (err, token) {
		if (err) {
			return err;
		} else {
			return token;
		}
	});
};

const authServices = {
	register,
	login,
	createToken,
};

module.exports = authServices;
