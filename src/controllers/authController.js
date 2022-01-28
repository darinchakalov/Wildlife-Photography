const router = require("express").Router();
const authServices = require("../services/authServices.js");
const { isUser, isGuest } = require("../middlewares/authMiddleware.js");

const { APP_COOKIE_NAME } = require("../config/constants.js");

const renderLoginPage = (req, res) => {
	res.render("login");
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await authServices.login(email, password);
		let token = await authServices.createToken(user);
		res.cookie(APP_COOKIE_NAME, token, {
			httpOnly: true,
		});
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

		res.cookie(APP_COOKIE_NAME, token, {
			httpOnly: true,
		});
		res.redirect("/");
	} catch (error) {
		res.locals.error = error;
		res.render("register");
	}
};

const logoutUser = (req, res) => {
	res.clearCookie(APP_COOKIE_NAME);
	res.redirect("/");
};

router.get("/login", isUser, renderLoginPage);
router.get("/register", isUser, renderRegisterPage);
router.post("/register", isUser, registerUser);
router.post("/login", isUser, loginUser);
router.get("/logout", isGuest, logoutUser);

module.exports = router;
