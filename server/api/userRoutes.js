//CRUD for users
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../mongodb.js";
export const router = express.Router();

/**
 * @type{import('mongodb').Collection} coll
 */

///Get users
router.get("/users", async (req, res) => {
  const coll = getDb().collection("users");
  try {
    let users = await coll.find().toArray();
    res.status(200).send(users);
  } catch (err) {
    console.log("Error is: " + err);
  }
});

//Get a user
router.get("/users/:id", async (req, res) => {
  try {
    const coll = getDb().collection("users");
    let user = await finduser(coll, req.params.id);
    if (!user) {
      throw "No user found";
    }
    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Add a user
router.post("/users", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("users");
    const newuser = req.body;
    console.log(newuser);

    if (await coll.findOne({ userName: newuser.userName })) {
      res.status(409).send("user with that name exits");
    } else {
      let result = await coll.insertOne(newuser);
      res
        .status(201)
        .location("/users/" + result.insertedId)
        .send();
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

//Update a user
router.put("/users/:id", async (req, res) => {
  try {
    if (!req.body) {
      throw "No body";
    }
    const coll = getDb().collection("users");
    let user = await finduser(coll, req.params.id);
    const updateuser = req.body;
    if (!user) {
      throw "No user found to update";
    } else {
      let userId = new ObjectId(req.params.id);
      await coll.updateOne(
        { _id: userId },
        {
          $set: {
            userName: updateuser.userName,
            superAdmin: updateuser.superAdmin,
            groupAdmin: updateuser.groupAdmin
          },
        }
      );
      res.status(204).send()
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete a user
router.delete("/users/:id", async (req,res) => {
  try {
    const coll = getDb().collection("users");
    let user = await finduser(coll, req.params.id);
    
    if (!user) {
      throw "No user found to delete";
    } else {
      let userId = new ObjectId(req.params.id);
      await coll.deleteOne({_id:userId})
      res.status(200).send()
    }
  } catch(err){
    res.status(404).send(err)
  }

})

async function finduser(collection, id) {
  let userId = new ObjectId(id);
  return await collection.findOne({ _id: userId });
}