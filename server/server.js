import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { connectToServer } from "./app.js";
import { router as groupsRouter } from "./api/groupRoutes.js";

//Define server and databse
const PORT = 3000;

//setup express
const app = express();

//setup sockets
const io = new Server();

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
  app.use("/api", groupsRouter);
  app.listen(PORT, () => {
    console.log("Connected on PORT:" + PORT);
  });
});
