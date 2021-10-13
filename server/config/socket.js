import { getDb } from "./mongodb.js";
import { ObjectId } from "mongodb";
import { channel } from "diagnostics_channel";

/**
 * Function that handles server side socket connection
 * @type {import('mongodb').Collection} usersColl messageColl
 * @param {import('socket.io').Server} io
 * @param {number} PORT
 */

const CHATBOT_IMG = "http://localhost:3000/profileImages/chatbot.png"

export function socketConnect(io, PORT) {
  //Get collections for users and messages in my database
  let usersColl = getDb().collection("users");
  let messageColl = getDb().collection("messages");

  //Handles all socket connections
  io.on("connection", (socket) => {
    //Handles specific connections for each user in each channel
    socket.on("joinChannel", async (user_Id, channel_Id) => {
      console.log("User " + user_Id)
      console.log("channel " + channel_Id)
      //join this socket connection to specific channel
      socket.join(channel_Id);
      socket.channel = channel_Id
 
      //db.foo.find().sort({_id:1}).limit(50);
      //get objectid for user and channel
    
      let userId = new ObjectId(user_Id);
      console.log("NEXT")
      let user = await usersColl.findOne(
        { _id: userId },
        { projection: { _id: 0, username: 1,  imagePath:1} }
      );
      console.log(user)
      console.log(user.username)
      socket.imagePath = user.imagePath
      socket.username = user.username
      socket.user_Id = userId
      socket.imagePath = user.imagePath
      //emit connection message to current user
      socket.emit("message", formatMessage(CHATBOT_IMG, "CHATBOT", `Welcome ${user.username}`));
      //tell all connected socket in roomed that the new user joined
      socket.broadcast
        .to(socket.channel)
        .emit(
          "message",
          formatMessage(CHATBOT_IMG, "CHATBOT", `${user.username} has joined the channel`)
        );
    });

    //Handle connection request
    console.log(`User connection on port ${PORT} : ${socket.id}`);

    //When message recieved emit to all sockets
    socket.on("message", (message) => {
      io.to(socket.channel).emit("message", formatMessage(socket.imagePath,socket.username, message));

      let channelId = new ObjectId(socket.channel);

      messageColl.insertOne({channelId:channelId, senderId: socket.user_Id, message: message, senderUsername:socket.username, imagePath: socket.imagePath})
    });
    socket.on("leaveChannel", (channel_Id) =>{
      socket.leave(channel_Id)
    })

    // socket.on("disconnect", () => {

    // })
  });
}
function formatMessage(imagePath, senderUsername, message) {
  return {
    imagePath,
    senderUsername,
    message,
  };
}
