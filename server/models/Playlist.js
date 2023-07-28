const { Schema, model } = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
