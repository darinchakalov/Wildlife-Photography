const postServices = require("../services/postServices.js");

const router = require("express").Router();

const renderCreatePage = (req, res) => {
	res.render("create");
};

const createPost = async (req, res) => {
	const { title, keyword, location, date, imageUrl, description } = req.body;
	try {
		await postServices.create(title, keyword, location, date, imageUrl, description, res.user.id);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error;
		res.render("create");
	}
};

const renderAllPostsPage = async (req, res) => {
	try {
		let posts = await postServices.getAll();
		res.render("all-posts", { posts });
	} catch (error) {
		res.locals.error = error.message;
		res.render("all-posts");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createPost);
router.get("/allPosts", renderAllPostsPage);

module.exports = router;
