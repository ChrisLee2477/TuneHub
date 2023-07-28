// ==== [Vars] ====

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const bodyParser = require("body-parser");

// ==== [Env] ====

const PORT = process.env.PORT || 3000;

// ==== [Server] ====
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// ==== [Cors] ====
app.use(cors());
const server = http.createServer(app);

//==== [Spotify] ====

app.use(bodyParser.json());

app.post("/spotifylogin", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/",
    clientId: "d67a6de2b2f045539acfef33cdff8840",
    clientSecret: "bd98e8446154499ab7eef56762cd16f2",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// ==== [Socket.io] ====

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
server.listen(3002, () => {
  console.log("SERVER IS RUNNING");
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await apolloServer.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(apolloServer, {}));

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
startApolloServer();
