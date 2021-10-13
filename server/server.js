import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToServer, getDb, seed } from "./config/mongodb.js";
import { router as groupsRouter } from "./api/groupRoutes.js";
import { router as usersRouter } from "./api/userRoutes.js";
import { router as channelsRouter } from "./api/channelRoutes.js"
import { socketConnect } from "./config/socket.js";
import passport from "passport";
import {passConfig }from "./config/passport.js";
import session from "express-session";


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


//express use cors and a json body parser
app.use(express.json());
app.use(cors());

//server static images
app.use("/profileImages",express.static("C:/Users/me/Documents/Uni 2021.2/3813ICT/goosechat/server/profileImages"))

passConfig(passport)
app.use(passport.initialize())



await connectToServer(async (err) => {
  if (err) {
    return console.error(err);
  }
  app.use('/profileImages', express.static('profileImages'))
  //seed()
  //add all routers to express apps
  app.use("/api", groupsRouter);
  app.use("/api", usersRouter);
  app.use("/api", channelsRouter);

  socketConnect(io, PORT)

  httpServer.listen(PORT, () => {
    console.log("Listening on PORT:" + PORT);
  })
});


export default app;
