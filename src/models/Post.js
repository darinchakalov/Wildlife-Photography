const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	keyword: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	votes: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	rating: {
		type: Number,
		default: 0,
	},
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
