const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Comment } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 }).populate("user");
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id }).populate("user");
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
      }
    },
    login: async (parent, { username, password }) => {
      console.log("login mutation reached");
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    postComment: async (parent, args) => {
      const { userId, content } = args;
      const user = await User.findById(userId);

      const newComment = new Comment({
        user: user._id,
        content,
        createdAt: new Date().toISOString(),
      });

      await newComment.save();
      return newComment;
    },
  },
};

module.exports = resolvers;
