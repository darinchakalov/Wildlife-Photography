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
		let user = await authServices.getUser(currentPost.author);
		console.log(user);
		currentPost.owner = user?.fullName;
		let isOwner = currentPost.author == user?._id;

		let isVoted = currentPost.votes.some((v) => v._id == res.user?.id);

		let allUsers = await authServices.getAll();
		let votedUsers = allUsers.filter((user) => currentPost.votes.some((x) => x.equals(user._id)));
		let voters = votedUsers.map((x) => x.email).join(", ");
		console.log(voters);
		res.render("details", { title: "Details", ...currentPost, isOwner, isVoted, voters });
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const postUpvote = async (req, res) => {
	try {
		await postServices.upvote(req.params.id, res.user.id);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const postDownvote = async (req, res) => {
	try {
		await postServices.downvote(req.params.id, res.user.id);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const deletePost = async (req, res) => {
	try {
		await postServices.del(req.params.id);
		res.redirect("/allPosts");
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const renderEditPage = async (req, res) => {
	try {
		let post = await postServices.getOne(req.params.id);
		res.render("edit", post);
	} catch (error) {
		res.locals.error = error.message;
		res.render("edit");
	}
};

const editPost = async (req, res) => {
	const { title, keyword, location, date, imageUrl, description } = req.body;
	try {
		const post = { title, keyword, location, date, imageUrl, description };
		await postServices.edit(req.params.id, post);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createPost);
router.get("/allPosts", renderAllPostsPage);
router.get("/details/:id", renderDetailsPage);
router.get("/upvote/:id", postUpvote);
router.get("/downvote/:id", postDownvote);
router.get("/delete/:id", deletePost);
router.get("/edit/:id", renderEditPage);
router.post("/edit/:id", editPost);

module.exports = router;
