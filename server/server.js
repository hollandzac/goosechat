import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToServer, seed } from "./mongodb.js";
import { router as groupsRouter } from "./api/groupRoutes.js";
import { router as usersRouter } from "./api/userRoutes.js";
import { router as channelsRouter } from "./api/channelRoutes.js"
import { socketConnect } from "./socket.js";

//Define server and databse
const PORT = 3000;

//setup express
const app = express();

//Create http server
const httpServer = createServer(app)

//setup socket server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

//databse globabl

//express use cors and a json body parser
app.use(express.json());
app.use(cors());
//establish socket connection
// io.on("connection", (socket) => {
//     socket.on("join", async (channelId) => {

//     })
// })

connectToServer(function(err) {
  console.log("HI");
  if (err) {
    console.error(err);
  }
  //seed()

  app.use("/api", groupsRouter);
  app.use("/api", usersRouter);
  app.use("/api", channelsRouter);
  socketConnect(io, PORT)
 
  httpServer.listen(PORT, () => {
    console.log("Listening on PORT:" + PORT);
  })
  // app.listen(PORT, () => {
  //   console.log("Connected on PORT:" + PORT);
  // });
});
