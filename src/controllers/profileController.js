const postServices = require("../services/postServices.js");
const authServices = require("../services/authServices.js");

const router = require("express").Router();

const renderMyPostsPage = async (req, res) => {
	try {
		let allPosts = await postServices.getAll();
		let myPosts = allPosts.filter((p) => p.author == res.user.id);
		let user = await authServices.getUser(res.user.id);
		let owner = user.fullName;
		myPosts.map((p) => (p.owner = owner));
		res.render("my-posts", { myPosts });
	} catch (error) {
		res.locals.error = error.message;
		res.render("my-posts");
	}
};

router.get("/myPosts", renderMyPostsPage);

module.exports = router;
