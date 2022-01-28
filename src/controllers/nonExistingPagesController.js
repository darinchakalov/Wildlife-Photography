const router = require("express").Router();

const nonExisting = (req, res) => {
	res.render("404");
};

router.get("*", nonExisting);

module.exports = router;
