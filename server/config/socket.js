import { getDb } from "./mongodb.js";
import { ObjectId } from "mongodb";
import { channel } from "diagnostics_channel";

/**
 * Function that handles server side socket connection
 * @type {import('mongodb').Collection} usersColl messageColl
 * @param {import('socket.io').Server} io
 * @param {number} PORT
 */
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
      let channelId = new ObjectId(channel_Id);
      let userId = new ObjectId(user_Id);

      let user = await usersColl.findOne(
        { _id: userId },
        { projection: { _id: 0, name: 1 } }
      );
      console.log(user.name)
      socket.username = user.name
      socket.user_Id = userId
      socket.channel_Id = channelId
      //emit connection message to current user
      socket.emit("message", formatMessage("CHATBOT", `Welcome ${user.name}`));
      //tell all connected socket in roomed that the new user joined
      socket.broadcast
        .to(channel_Id)
        .emit(
          "message",
          formatMessage("CHATBOT", `${user.name} has joined the channel`)
        );
    });

    //Handle connection request
    console.log(`User connection on port ${PORT} : ${socket.id}`);

    //When message recieved emit to all sockets
    socket.on("message", (message) => {
      io.to(socket.channel).emit("message", formatMessage(socket.username, message));
      messageColl.insertOne({channelId:socket.channel_Id, sender: socket.user_Id, message: message})
    });

    // socket.on("disconnect", () => {

    // })
  });
}
function formatMessage(username, message) {
  return {
    username,
    message,
  };
}
