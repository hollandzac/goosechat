//CRUD for groups
import express from "express";
import { get } from "https";
import { getDb } from "../app.js";
export const router = express.Router();

/**
 * @type{import('mongodb').Collection} coll
 */

///Get all groups
router.get("/groups", async (req, res) => {
  const coll = getDb().collection("groups")
  try {
      let groups = await coll.find().toArray()
      res.status(200).send("Works")
  } catch (err) {
    console.log("Error is: " + err)
  }
});
// router.get("/api/read", async (req, res) => {
//   try {
//     let groups = await collection.find().toArray();
//     return res.send(groups);
//   } catch (err) {
//     console.log("Error adding to database: " + err);
//   }
// });
