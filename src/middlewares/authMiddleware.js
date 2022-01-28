const jwt = require("jsonwebtoken");
const { APP_COOKIE_NAME, SECRET } = require("../config/constants.js");

exports.auth = (req, res, next) => {
	const token = req.cookies[APP_COOKIE_NAME];

	if (!token) {
		return next();
	}

	jwt.verify(token, SECRET, function (err, decodedToken) {
		if (err) {
			res.clearCookie(APP_COOKIE_NAME);
			return res.redirect("/login");
		} else {
			res.user = decodedToken;
			res.locals.user = decodedToken;
			return next();
		}
	});
};

exports.isUser = (req, res, next) => {
	if (res.user) {
		res.redirect("/");
	} else {
		next();
	}
};

exports.isGuest = (req, res, next) => {
	if (!res.user) {
		res.redirect("/login");
	} else {
		next();
	}
};
