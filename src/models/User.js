const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	myPosts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

userSchema.pre("save", function () {
	bcrypt
		.hash(this.password, 10)
		.then((hash) => {
			return (this.password = hash);
		})
		.catch((err) => {
			throw new Error(err);
		});
});

userSchema.method("confirmPass", function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
