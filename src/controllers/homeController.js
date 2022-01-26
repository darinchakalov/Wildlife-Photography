const router = require("express").Router();

const renderHomePage = (req, res) => {
	console.log(req.user, res.user);
	res.render("home");
};

router.get("/", renderHomePage);

module.exports = router;
