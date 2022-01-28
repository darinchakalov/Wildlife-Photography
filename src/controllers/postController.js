const postServices = require("../services/postServices.js");
const authServices = require("../services/authServices.js");

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
		res.locals.error = error.message;
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

const renderDetailsPage = async (req, res) => {
	try {
		let currentPost = await postServices.getOne(req.params.id);
		let user = await authServices.getUser(res.user.id);
		currentPost.owner = user.fullName;
		let isOwner = currentPost.author == user._id;
		res.render("details", { ...currentPost, isOwner });
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const postUpvote = async (req, res) => {
	try {
		
	} catch (error) {
		
	}
}

router.get("/create", renderCreatePage);
router.post("/create", createPost);
router.get("/allPosts", renderAllPostsPage);
router.get("/details/:id", renderDetailsPage);

module.exports = router;
