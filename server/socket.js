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
    socket.on("joinChannel", async ({ user, channel }) => {
      //join this socket connection to specific channel
      socket.join(channel);
      socket.channel = channel
 
      //db.foo.find().sort({_id:1}).limit(50);
      //get objectid for user and channel
      let channelId = new ObjectId(channel);
      let userId = new ObjectId(user);

      let username = await usersColl.findOne(
        { _id: userId },
        { projection: { _id: 0, name: 1 } }
      );
      socket.username = username
      //emit connection message to current user
      socket.emit("message", formatMessage("CHATBOT", `Welcome ${username}`));
      //tell all connected socket in roomed that the new user joined
      socket.broadcast
        .to(channel)
        .emit(
          "message",
          formatMessage("CHATBOT:", `${username} has joined the channel`)
        );
    });

    //Handle connection request
    console.log(`User connection on port ${PORT} : ${socket.id}`);

    //When message recieved emit to all sockets
    socket.on("message", (message) => {
      io.to(socket.channel).emit("message", formatMessage(socket.username, message));
      messageColl.insertOne({channelId:channel, sender: socket.username, message: message})
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
