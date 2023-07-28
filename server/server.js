const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors());
const server = http.createServer(app);

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
