const Post = require("../models/Post.js");

const create = function (title, keyword, location, date, imageUrl, description, author) {
	return Post.create({ title, keyword, location, date, imageUrl, description, author });
};

const postServices = {
	create,
};

module.exports = postServices;
