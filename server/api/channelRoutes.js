import { channel } from "diagnostics_channel";
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb.js";
import { getUserId, findGroup } from "./groupRoutes.js";
export const router = express.Router();

/**
 * CRUD routes for channels on a specific group
 * @type{import('mongodb').Collection} coll
 */

/**
 * Get all channels for a specfic groupid
 * Returns an array of channels
 */
router.get("/groups/:id/channels", async (req, res) => {
  const coll = getDb().collection("groups");
  try {
    let channels = await coll.findOne({_id: new ObjectId(req.params.id)}, {projection: {_id: 0, channels: 1}})
  
    res.status(200).send(channels.channels);
  } catch (err) {
    res.status(400).send()
    console.log("Error is: " + err);
  }
});

/**
 * Add a channel to group with groupID
 * Returns status 201 on success 
 */
router.post("/groups/:groupId/channels", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    const newChannel = req.body;
    let group = await findGroup(coll, req.params.groupId);
    if (!group) {
      throw "No group found";
    }

    //Checks to see if a channel with that name already exists in the group
    const exists = group.channels.find((ele) => {
      return ele.name === newChannel.name;
    });


    if (exists) {
      res.status(409).send("Channel with that name exists");
    } else {
      let _id = new ObjectId();
      newChannel._id = _id;
      await coll.updateOne(
        { _id: group._id },
        { $push: { channels: newChannel } }
      );
      res.status(201).send();
    }
  } catch (err) {
    res.status(401).send(err);
  }
});

/**
 * Updates a channel
 * 
 */
router.put("/groups/:groupId/channels/:channelId", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    let channel = req.body;
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.groupId);

    if (!group) {
      throw "Group not found";
    }
    let groupId = new ObjectId(req.params.groupId);
    let channelId = new ObjectId(req.params.channelId);
    let updatedChannel = await coll.updateOne(
      { _id: groupId, "channels._id": channelId },
      {
        $set: {
          "channels.$.name": channel.name,
          "channels.$.description": channel.description,
        },
      }
    );
    res.status(200).send(updatedChannel);
  } catch (err) {
    res.status(400).send(err);
    console.log("ERROR: " + err);
  }
});

/**
 * Adds a user to channel
 */
router.put("/groups/:groupId/channels/:channelId/users", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    let username = req.body.username;

    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.groupId);

    if (!group) {
      throw "Group not found";
    }
    let channelId = new ObjectId(req.params.channelId);
    let userId = await getUserId(username);
    if (userId) {
      let result = await coll.findOne({
        _id: group._id,
        "channels._id": channelId,
        "channels.users": userId._id,
      });
      if (result) {
        throw "User already in group";
      }
      let result2 = await coll.updateOne({
          _id: group._id, "channels._id": channelId
      }, {$push: {"channels.$.users": userId._id}})

      res.status(200).send(userId);
    } else {
      console.log("throwing");
      throw "Username does not exist";
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
/**
 * Deletes a channel from group
 * 
 */
router.delete("/groups/:groupId/channels/:channelId", async (req, res) => {
  try {
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.groupId);

    if (!group) {
      throw "No group found";
    } else {
      let channelId = new ObjectId(req.params.channelId);
      await coll.updateOne(
        { _id: group._id },
        { $pull: { channels: { _id: channelId } } }
      );
      res.status(200).send();
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * deletes a user from that channel in group
 */
router.delete("/groups/:groupId/channels/:channelId/users/:username", async (req, res) => {
    try {
      if (!req.body) {
        throw "No body";
      }
      const coll = getDb().collection("groups");
      let group = await findGroup(coll, req.params.groupId);
      let userId = await getUserId(req.params.username);
      let channelId = new ObjectId(req.params.channelId);
      if (!group) {
        throw "Group Error";
      }
      if (!userId) {
        throw "Username does not exist";
      }
      let findUser = await coll.findOne({_id: group._id, "channels._id": channelId, "channels.users": userId._id});
  
      if(!findUser){
        throw "User not in group"
      }
  
      let result = await coll.updateOne(
        { _id: group._id , "channels._id": channelId},
        { $pull: { "channels.$.users": userId._id} }
      );
      console.log(result)
      res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  });

  /**
   * Get a paginated history of channel messages
   */
  router.get("/groups/:groupId/channels/:channelId/messages",async (req,res) =>{
    try {
        const messages = getDb().collection( "messages");

        let channel_id = new ObjectId(req.params.channelId)
        let result = await messages.find({channelId: channel_id},{projection : {channelId: 0}}).toArray()

        console.log("RESUTL")
        console.log(result)
        res.status(200).send({messages: result})
    }catch(err){
            res.status(400).send(err)
        }

  })