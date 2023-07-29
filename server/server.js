const express = require("express");
const { ApolloServer } = require("@apollo/server");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { expressMiddleware } = require("@apollo/server/express4");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const spotifyApi = require("spotify-web-api-node");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3000;
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
const server = http.createServer(app);

// Spotify Web API

app.post("/spotifylogin", async (req, res) => {
  try {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000/",
      clientId: "d67a6de2b2f045539acfef33cdff8840",
      clientSecret: "bd98e8446154499ab7eef56762cd16f2",
    });

    const code = req.body.code;

    const data = await spotifyApi.authorizationCodeGrant(code);

    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000/",
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
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(apolloServer, {}));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }
  await apolloServer.start();

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
