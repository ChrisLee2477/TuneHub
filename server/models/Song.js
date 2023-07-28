const { Schema, model } = require("mongoose");

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration: { type: Number, required: true },
});

const Song = model("Song", songSchema);

module.exports = Song;
