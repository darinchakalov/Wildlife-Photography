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

const downvote = async function (postId, userId) {
	try {
		let post = await Post.findById(postId);
		post.rating--;
		post.votes.push(userId);
		return post.save();
	} catch (error) {
		return error;
	}
};

const upvote = async function (postId, userId) {
	try {
		let post = await Post.findById(postId);
		post.rating++;
		post.votes.push(userId);
		return post.save();
	} catch (error) {
		return error;
	}
};

const postServices = {
	create,
	getAll,
	getOne,
	upvote,
	downvote,
};

module.exports = postServices;
