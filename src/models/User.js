const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: [3, "First name needs to be at least 3 characters"],
	},
	lastName: {
		type: String,
		required: true,
		minlength: [5, "Last name needs to be at least 5 characters"],
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: [4, "Password needs to be at least 5 characters"],
	},
	myPosts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

userSchema.pre("save", function (next) {
	bcrypt
		.hash(this.password, 10)
		.then((hash) => {
			this.password = hash;
			next();
		})
		.catch((err) => {
			throw new Error(err);
		});
});

userSchema.virtual("fullName").get(function () {
	return `${this.firstName} ${this.lastName}`;
});

userSchema.method("confirmPass", function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
