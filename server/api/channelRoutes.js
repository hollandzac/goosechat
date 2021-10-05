import { channel } from "diagnostics_channel";
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../mongodb.js";
import { findGroup } from "./groupRoutes.js";
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
router.put("/groups/:groupId/channels/:channelId", async (req,res) => {
    try{
       if (!req.body) {
        throw "No body";
       }
       let channel = req.body
       const coll = getDb().collection("groups");
       let group = await findGroup(coll, req.params.groupId);
       
       if(!group){
           throw "Group not found"
       }
       let groupId = new ObjectId(req.params.groupId)
       let channelId = new ObjectId(req.params.channelId)
       let updatedChannel = await coll.updateOne(
           {_id: groupId, "channels._id": channelId},
           { $set: {"channels.$.name": channel.name, "channels.$.description": channel.description}}
       )
        res.status(200).send(updatedChannel)
    }catch(err){
        res.status(400).send(err)
        console.log("ERROR: " + err)
    }
})
// //Update a group
// router.put("/groups/:id", async (req, res) => {
//   try {
//     if (!req.body) {
//       throw "No body";
//     }
//     const coll = getDb().collection("groups");
//     let group = await findGroup(coll, req.params.id);
//     const updateGroup = req.body;
//     if (!group) {
//       throw "No group found to update";
//     } else {
//       let groupId = new ObjectId(req.params.id);
//       await coll.updateOne(
//         { _id: groupId },
//         {
//           $set: {
//             groupName: updateGroup.groupName,
//             channels: updateGroup.channels,
//             users: updateGroup.users,
//             assistants: updateGroup.assistants,
//           },
//         }
//       );
//       res.status(204).send();
//     }
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

//Delete a Channel
router.delete("/groups/:groupId/channels/:channelId", async (req, res) => {
  try {
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.groupId);

    if (!group) {
      throw "No group found";
    } else {
      let channelId = new ObjectId(req.params.channelId);
      let idx = group.channels.findIndex((idx) => idx._id === channelId);
      console.log("INDEX:" + idx);
      group.channels.splice(idx, 1);
      await coll.updateOne(
        { _id: group._id },
        { $set: group }
      );
      res.status(200).send();
    }
  } catch (err) {
    res.status(404).send(err);
  }
});
