const router = require("express").Router();
const authServices = require("../services/authServices.js");

const { APP_COOKIE_NAME } = require("../config/constants.js");

const renderLoginPage = (req, res) => {
	res.render("login");
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await authServices.login(email, password);
		let token = await authServices.createToken(user);

		res.cookie(APP_COOKIE_NAME, token);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error;
		res.render("login");
	}
};

const renderRegisterPage = (req, res) => {
	res.render("register");
};

const registerUser = async (req, res) => {
	let { firstName, lastName, email, password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		res.locals.error = "Passwords don't match";
		return res.render("register");
	}
	try {
		await authServices.register(firstName, lastName, email, password);

		let user = await authServices.login(email, password);
		let token = await authServices.createToken(user);

		res.cookie(APP_COOKIE_NAME, token);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error;
		res.render("register");
	}
};

router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
