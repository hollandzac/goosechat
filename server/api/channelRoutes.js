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

///Get all channels for a group
router.get("/groups/:id/channels", async (req, res) => {
  const coll = getDb().collection("groups");
  try {
    let channels = await coll.find().toArray();
    res.status(200).send(channels);
  } catch (err) {
    console.log("Error is: " + err);
  }
});

// //Get a group
// router.get("/groups/:id", async (req, res) => {
//   try {
//     const coll = getDb().collection("groups");
//     let group = await findGroup(coll, req.params.id);
//     if (!group) {
//       throw "No group found";
//     }
//     console.log(group);
//     res.status(200).send(group);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

//Add a channel
router.post("/groups/:groupId/channels", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    const newChannel = req.body;
    console.log(req.params.groupId);
    let group = await findGroup(coll, req.params.groupId);
    console.log(group);

    if (!group) {
      throw "No group found";
    }

    const exists = group.channels.find((ele) => {
      return ele.name === newChannel.name;
    });

    console.log(exists);
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
//Update a channel
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

//Add a user to channel
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
    console.log(username);
    let groupId = new ObjectId(req.params.groupId);
    let channelId = new ObjectId(req.params.channelId);
    let userId = await getUserId(username);
    if (userId) {
      console.log(channelId);
      let result = await coll.findOne({
        _id: group._id,
        "channels._id": channelId,
        "channels.users": userId._id,
      });
      console.log(result);
      if (result) {
        throw "User already in group";
      }
      let result2 = await coll.updateOne(
        { _id: group._id },
        { $push: { "channels.$[el].users": userId._id } },
        { arrayFilters: [{ "el._id": channelId }] }
      );
      console.log(result2); /*  */
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
//Delete a Channel
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
