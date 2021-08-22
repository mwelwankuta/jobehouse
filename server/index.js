const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv/config");

const typeDefs = require("./models/typeDefs");
const resolvers = require("./models/resolvers");

const uploadPostImage = require("./routes/uploadPostImage.js");

const app = express();
const { MONGODB_CONNECTION_URI, OFFLINE_CONNECTION_URI } = process.env;

app.use(cors());
app.use(fileUpload());
app.use("/upload", uploadPostImage);

mongoose.connect(MONGODB_CONNECTION_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => console.log("Database connected..."));
mongoose.connection.on("error", () =>
  console.log("Failed to connect to database...")
);

const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 7000;
server.start().then(() => {
  app.listen({ port: 7000 }, () => console.log(`Listening on port ${port}`));
  server.applyMiddleware({ app });
});
