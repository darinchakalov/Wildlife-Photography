const Post = require("../models/Post.js");

const create = function (title, keyword, location, date, imageUrl, description, author) {
	return Post.create({ title, keyword, location, date, imageUrl, description, author });
};

const getAll = function () {
	return Post.find().lean();
};

const getOne = function (id) {
	return Post.findOne({ _id: id }).lean();
};

const postServices = {
	create,
	getAll,
	getOne,
};

module.exports = postServices;
