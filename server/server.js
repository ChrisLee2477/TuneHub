const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const spotifyWebApi = require("soptify-web-api-node");

app.use(cors());
const server = http.createServer(app);

// Spotify Web API

app
  .post("/spotifylogin", (req, res) => {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000/",
      clientId: "d67a6de2b2f045539acfef33cdff8840",
      clientSecret: "bd98e8446154499ab7eef56762cd16f2",
    });

    spotifyApi.authorizationCodeGrant(code).then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    });
  })
  .catch(() => {
    res.sendStatus(400);
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
