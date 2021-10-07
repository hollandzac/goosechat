//CRUD for users
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb.js";
import { createPassowrd } from "../utils/passwordUtils.js";
import passport from "passport";
import { fileUploadManager } from "../config/fileUploadMulter.js";
import { throws } from "assert";
export const router = express.Router();

/**
 * @type{import('mongodb').Collection} coll
 */

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    delete req.user.passHash;
    res.send(req.user);
  }
);

router.post("/register", async (req, res, next) => {
  try {
    if (!req.body) {
      throw "No Body";
    }
    const coll = getDb().collection("users");
    console.log(req.body);
    if (!(await coll.findOne({ username: req.body.username }))) {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        passHash: await createPassowrd(req.body.password),
        superAdmin: false,
        groupAdmin: false,
      };
      console.log("HEre");
      let result = await coll.insertOne(newUser);
      if (result.acknowledged) {
        newUser["_id"] = result.insertedId;
        delete newUser.passHash;
        res.status(200).send(newUser);
      } else {
        throws("Databse Error");
      }
    } else {
      res.status(409).send("Username taken");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

///Get user data -passwords
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
    delete user.passHash;
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

    if (await coll.findOne({ username: newuser.username })) {
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
    }
    if(updateuser.password){
      await coll.updateOne(
        { _id: user._id },
        {
          $set: {
            passHash: await createPassowrd(updateuser.password),
          },
        }
      );
    }
    if(updateuser.email){
      await coll.updateOne(
        { _id: user._id },
        {
          $set: {
            email: updateuser.email
          },
        }
      );
    }
  
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete all users except super admin
router.delete("/users", async (req, res) => {
  try {
    const coll = getDb().collection("users");
    coll.deleteMany({username: {$ne:"superadmin"}})
    res.status(200).send()
  } catch (err) {
    res.status(404).send(err);
  }
});

//change user admin role to group admin
router.post("/users/groupadmin", async (req,res) => {
  try {
    const coll = getDb().collection("users");
    let user = await coll.findOne({username: req.body.username})
    if (!user) {
      throw "User doesnt exist"
    }
    console.log(req.body.groupadmin)
    await coll.updateOne({_id: user._id}, {$set : {groupAdmin: req.body.groupadmin}})
    res.status(200).send()
  }catch(err){
      res.status(400).send(err)
    }
})

//uploadProfileImg
router.post("/users/:userId/profileimage", async (req, res) => {
  try {
    await fileUploadManager(req, res);

    let coll = getDb().collection("users");

    let userId = new ObjectId(req.params.userId);

    let profileImagePath =
      "http://localhost:3000/profileImages/" + req.file.filename;
    console.log(profileImagePath);
    let result = await coll.updateOne(
      { _id: userId },
      { $set: { imagePath: profileImagePath } }
    );
    console.log(result);

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// //get profile image
// router.get("/users/:id/profileimage", async (req,res) => {
//   try {
//     const coll = getDb().collection("users");
//     let user = await finduser(coll, req.params.id);

//     if (!user) {
//       throw "No user found";
//     }
//     console.log(user.imagePath === "")
//     let imagePath = user.imagePath
//     if(imagePath === ""){
//       imagePath = "C:/Users/me/Documents/Uni 2021.2/3813ICT/goosechat/server/profileImages/default.jpg"
//     }
//     res.sendFile(imagePath)

//   }catch(err){
//       res.status(400).send(err)
//     }

// })

async function finduser(collection, id) {
  let userId = new ObjectId(id);
  return await collection.findOne({ _id: userId });
}
