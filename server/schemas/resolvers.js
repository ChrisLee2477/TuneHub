const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Comment, Playlist, Track } = require("../models");

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
    createPlaylist: async (parent, { title, description }, context) => {
      try {
        // Ensure user is authenticated
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to create a playlist"
          );
        }

        // Create the playlist
        const playlist = new Playlist({
          title,
          description,
          owner: context.user._id,
          tracks: [], // Initialize with an empty array of tracks
        });

        await playlist.save();

        // Add the playlist ID to the user's playlists array
        context.user.playlists.push(playlist._id);
        await context.user.save();

        return playlist;
      } catch (error) {
        console.error(error);
      }
    },
    addTrackToPlaylist: async (
      parent,
      { playlistId, title, artist, album, duration, uri, imageUrl }
    ) => {
      try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
          throw new Error("Playlist not found");
        }

        // Create the track
        const track = new Track({
          title,
          artist,
          album,
          duration,
          uri,
          imageUrl,
        });

        // Save the track to the database
        await track.save();

        // Add the track ID to the playlist's tracks array
        playlist.tracks.push(track._id);
        await playlist.save();

        return track;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

module.exports = resolvers;
