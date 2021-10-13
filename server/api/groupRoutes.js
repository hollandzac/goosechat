//CRUD for groups
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb.js";
export const router = express.Router();

/**
 * @type{import('mongodb').Collection} coll
 */

/**
 * Get all groups
 * Returns a JSON array of all group objects
 */
router.get("/groups", async (req, res) => {
  const coll = getDb().collection("groups");
  try {
    let groups = await coll.find().toArray();
    res.status(200).send(groups);
  } catch (err) {
    console.log("Error is: " + err);
  }
});

/**
 * Get a group
 * Retruns a single group matching id parameter
 */
router.get("/groups/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const coll = getDb().collection("groups");
    let group = await findGroup(coll, req.params.id);
    if (!group) {
      throw "No group found";
    }
    res.status(200).send(group);
  } catch (err) {
    console.log(err)
    res.status(404).send(err);
  }
});

/**
 * Add a group
 * Returns 201 with location of added resource enpoint
 */
router.post("/groups", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("groups");
    const newGroup = req.body;

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

/**
 * Add users to group
 * Returns userID
 */

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

/**
 * Update a group
 * Retrurns 204 No Content on success
 */
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

/**
 * Deletes a group with ID
 */
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
 * Finds a returns a group matching ID
 * @param {import('mongodb').Collection} coll
 */

export async function findGroup(coll, id) {
  let groupId = new ObjectId(id);
  return await coll.findOne({ _id: groupId });
}
/**
 * Finds and returns a user with username
 * 
 * @param {string} username 
 * @returns 
 */
export async function getUserId(username) {
  let coll = getDb().collection("users");
  return await coll.findOne({ username: username }, { projection: { _id: 1 } });
}


/**
 * 
 * Adds a user to a channel and group
 * 
 * 
 * @param {*} req the req from HTTP 
 * @param {boolean} isAssistant assistant flag
 * @returns errors
 */
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
    //Checks if user exists
    if (userId) {
      // If user is to be assitant then add otherwise eroor
      if (isAssistant) {
        let result = await coll.findOne({
          _id: group._id,
          assistants: userId._id,
        });
        if (result) {
          throw "User already a assistant";
        }
        //Add user to database
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
