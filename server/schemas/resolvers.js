const { v4: uuidv4 } = require("uuid");
const { User, Song, Playlist, Comment } = require("../models");

const resolvers = {
  Query: {
    getUserById: async (parent, args) => {
      const { id } = args;
      return await User.findById(id);
    },
    getAllSongs: async () => {
      return await Song.find();
    },
    getPlaylistById: async (parent, args) => {
      const { id } = args;
      return await Playlist.findById(id).populate("songs");
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
      return newUser;
    },
    createSong: async (parent, args) => {
      const { title, artist, album, duration } = args;
      const newSong = new Song({
        title,
        artist,
        album,
        duration,
      });
      await newSong.save();
      return newSong;
    },
    createPlaylist: async (parent, args) => {
      const { name, creatorId } = args;
      const creator = await User.findById(creatorId);
      if (!creator) {
        throw new Error("User not found");
      }
      const newPlaylist = new Playlist({
        name,
        creator: creator._id,
        songs: [],
      });
      await newPlaylist.save();
      return newPlaylist;
    },
    addSongToPlaylist: async (parent, args) => {
      const { playlistId, songId } = args;
      const playlist = await Playlist.findById(playlistId);
      const songToAdd = await Song.findById(songId);

      if (!playlist || !songToAdd) {
        throw new Error("Playlist or Song not found");
      }

      playlist.songs.push(songToAdd);
      await playlist.save();
      return playlist;
    },
    postComment: async (parent, args) => {
      const { playlistId, userId, content } = args;
      const playlist = await Playlist.findById(playlistId);
      const user = await User.findById(userId);

      if (!playlist || !user) {
        throw new Error("Playlist or User not found");
      }

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
