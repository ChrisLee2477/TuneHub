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
const cookieParser = require("cookie-parser");

// ==== [Env] ====

const PORT = process.env.PORT || 3000;

// ==== [Server] ====
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// ==== [Cors] ====
app.use(cors());
app.use(cookieParser());
const server = http.createServer(app);

//==== [Spotify] ====

app.use(bodyParser.json());

var client_id = "8000e5a74ec242939a1246f4295be86c"; // Your client id
var client_secret = "0a652098d8db4e21b13c660584ad0ba0"; // Your secret
var redirect_uri = "http://localhost:3000/spotifylogin"; // Your redirect uri

app.get("/auth/login", (req, res) => {});

app.get("/auth/callback", (req, res) => {});

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.post("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
  }
});

app.get("/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
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

// ==== [Apollo] ====

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
