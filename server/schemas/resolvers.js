const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate([{ path: "posts" }, { path: "likedPost" }]);
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate([
        { path: "posts" },
        { path: "likedPost" },
      ]);
    },
    posts: async (parent, { postAuthor }) => {
      const params = postAuthor ? { postAuthor } : {};
      return Post.find(params).sort({ createdAt: -1 }).populate("likedBy");
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate("likedBy");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate([
          { path: "posts" },
          { path: "likedPost" },
        ]);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, userPic }) => {
      const user = await User.create({ username, email, password, userPic });
      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, { username, password, userPic }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: { username: username, password: password, userPic: userPic },
          },
          { new: true }
        );
        const token = signToken(user);
        return { token, user };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    likedPost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likedBy: context.user._id } }
        );
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { likedPost: postId } }
          );
          return (post.populate("likedBy"), user.populate("likedPost"));
        }
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    unlikePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likedBy: context.user._id } },
          { new: true }
        );
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { likedPost: postId } },
            { new: true }
          );
          return (post.populate("likedBy"), user.populate("likedPost"));
        }
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    removeUser: (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { postImage, postText }, context) => {
      if (context.user) {
        const post = await Post.create({
          postImage,
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return post.save();
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // saveLike: async (parent, { newLike }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { likedPosts: newLike } },
    //       { new: true }
    //     );
    //     return updatedUser;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
