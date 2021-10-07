//CRUD for groups
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb.js";
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
router.put("/groups/:id/users", async (req, res) => {
  let result = await addUser(req, false);
  if (result.err) {
    res.status(400).send(result.err);
  } else {
    res.status(201).send(result.userId);
  }
});
router.put("/groups/:id/assistants", async (req, res) => {
  let result = await addUser(req, true);
  console.log(result);
  if (result.err) {
    res.status(400).send(result.err);
  } else {
    res.status(201).send(result.userId);
  }
});

//Remove user from group
router.delete("/groups/:id/users/:username", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);
    let userId = await getUserId(req.params.username);

    if (!group) {
      throw "Group Error";
    }
    if (!userId) {
      throw "Username does not exist";
    }
    console.log(group._id)
    console.log(userId._id)

    let findUser = await coll.findOne({_id: group._id, $or: [{users: userId._id},{assistants: userId._id}]});

    if(!findUser){
      throw "User no in group"
    }

    let result = await coll.updateOne(
      { _id: group._id },
      { $pull: { users: userId._id, assistants: userId._id  } }
    );
    console.log(result)
    res.send("Success")
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
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
            description: updateGroup.description,
            channels: updateGroup.channels,
            users: updateGroup.users,
            assistants: updateGroup.assistants,
          },
        }
      );
      res.status(204).send();
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete a group
router.delete("/groups/:id", async (req, res) => {
  try {
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);

    if (!group) {
      throw "No group found to delete";
    } else {
      let groupId = new ObjectId(req.params.id);
      await coll.deleteOne({ _id: groupId });
      res.status(200).send();
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

/**
 * @param {import('mongodb').Collection} coll
 */

export async function findGroup(coll, id) {
  let groupId = new ObjectId(id);
  return await coll.findOne({ _id: groupId });
}
export async function getUserId(username) {
  let coll = getDb().collection("users");
  return await coll.findOne({ username: username }, { projection: { _id: 1 } });
}

async function addUser(req, isAssistant) {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);
    if (!group) {
      throw "Group Error";
    }

    const updateUser = req.body;
    let userId = await getUserId(updateUser.username);
    if (userId) {
      if (isAssistant) {
        let result = await coll.findOne({
          _id: group._id,
          assistants: userId._id,
        });
        if (result) {
          throw "User already a assistant";
        }
        await coll.updateOne(
          { _id: group._id },
          { $push: { assistants: userId._id } }
        );
      } else {
        let result = await coll.findOne({ _id: group._id, users: userId._id });
        if (result) {
          throw "User already in group";
        }
        await coll.updateOne(
          { _id: group._id },
          { $push: { users: userId._id } }
        );
      }
      return { err: null, userId: userId };
    } else {
      console.log("throwing");
      throw "Username does not exist";
    }
  } catch (err) {
    console.log(err);
    return { err: err, userId: null };
  }
}
