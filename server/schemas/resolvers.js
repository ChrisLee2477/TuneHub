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
    createUser: async (parent, args) => {
      const { username, email, password } = args;
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();

      const token = signToken({ userId: newUser._id });

      return { user: newUser, token };
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
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken({ userId: user._id });
      return { user, token };
    },
  },
};

module.exports = resolvers;
