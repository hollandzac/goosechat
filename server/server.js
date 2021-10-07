import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToServer, seed } from "./config/mongodb.js";
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

//databse globabl


//express use cors and a json body parser
app.use(express.json());
app.use(cors());

//app.use(session())

passConfig(passport)
app.use(passport.initialize())
//app.use(passport.session())


connectToServer(function(err) {
  console.log("HI");
  if (err) {
    return console.error(err);
  }
  app.use('/profileImages', express.static('profileImages'))
 // seed()
  app.use("/api", groupsRouter);
  app.use("/api", usersRouter);
  app.use("/api", channelsRouter);
  socketConnect(io, PORT)
 
  httpServer.listen(PORT, () => {
    console.log("Listening on PORT:" + PORT);
  })
});
