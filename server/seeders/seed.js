const db = require("../config/connection");
const { Comment, Playlist, Song, User } = require("../models");
const commentSeeds = require("./commentSeeds.json");
const playlistSeeds = require("./playlistSeeds.json");
const songSeeds = require("./songSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

const seedDatabase = async () => {
  try {
    await cleanDB("Comment", "comments");
    await cleanDB("Playlist", "playlists");
    await cleanDB("Song", "songs");
    await cleanDB("User", "users");

    await Comment.create(commentSeeds);
    await Playlist.create(playlistSeeds);
    await Song.create(songSeeds);
    await User.create(userSeeds);

    console.log("All done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
};

db.once("open", seedDatabase);
