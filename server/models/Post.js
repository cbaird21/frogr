const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// post schema is what allows us to map through posts
const postSchema = new Schema({
  postImage: {
    type: String,
    trim: true,
  },
  postText: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    }
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;