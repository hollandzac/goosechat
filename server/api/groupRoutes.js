//CRUD for groups
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../mongodb.js";
export const router = express.Router();

/**
 * @type{import('mongodb').Collection} coll
 */

///Get all groups
router.get("/groups", async (req, res) => {
  const coll = getDb().collection("groups");
  try {
    let groups = await coll.find().toArray();
    res.status(200).send(groups);
  } catch (err) {
    console.log("Error is: " + err);
  }
});

//Get a group
router.get("/groups/:id", async (req, res) => {
  try {
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);
    if (!group) {
      throw "No group found";
    }
    console.log(group);
    res.status(200).send(group);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Add a group
router.post("/groups", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    const newGroup = req.body;
    console.log(newGroup);

    if (await coll.findOne({ groupName: newGroup.groupName })) {
      res.status(409).send("Group with that name exits");
    } else {
      let result = await coll.insertOne(newGroup);
      res
        .status(201)
        .location("/groups" + result.insertedId)
        .send();
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

//Update a group
router.put("/groups/:id", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);
    const updateGroup = req.body;
    if (!group) {
      throw "No group found to update";
    } else {
      let groupId = new ObjectId(req.params.id);
      await coll.updateOne(
        { _id: groupId },
        {
          $set: {
            groupName: updateGroup.groupName,
            channels: updateGroup.channels,
            users: updateGroup.users,
            assistants: updateGroup.assistants,
          },
        }
      );
      res.status(204).send()
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete a group
router.delete("/groups/:id", async (req,res) => {
  try {
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);
    
    if (!group) {
      throw "No group found to delete";
    } else {
      let groupId = new ObjectId(req.params.id);
      await coll.deleteOne({_id:groupId})
      res.status(200).send()
    }
  } catch(err){
    res.status(404).send(err)
  }

})

/**
 * @param {import('mongodb').Collection} coll
 */

async function findGroup(coll, id) {
  let groupId = new ObjectId(id);
  return await coll.findOne({ _id: groupId });
}
