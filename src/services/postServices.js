const Post = require("../models/Post.js");

const create = function (title, keyword, location, date, imageUrl, description, author) {
	return Post.create({ title, keyword, location, date, imageUrl, description, author });
};

const getAll = function () {
	return Post.find().lean();
};

const postServices = {
	create,
	getAll,
};

module.exports = postServices;
