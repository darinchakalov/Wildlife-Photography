const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const { auth } = require("../middlewares/authMiddleware.js");
const router = require("../config/router.js");

module.exports = (app) => {
	app.engine(
		"hbs",
		handlebars.engine({
			extname: "hbs",
		})
	);

	app.set("view engine", "hbs");

	app.set("views", path.resolve(__dirname, "../views"));

	app.use(express.urlencoded({ extended: true }));

	app.use("/static", express.static(path.resolve(__dirname, "../static")));

	app.use(cookieParser());

	app.use(auth);

	router(app);
};
