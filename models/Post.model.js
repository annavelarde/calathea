/** @format */

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		image: String,
		title: String,
		text: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}, // this will eventually change
		hashtag: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Hashtag",
			},
		], // this will also change
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{
		timestamps: true,
	},
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;