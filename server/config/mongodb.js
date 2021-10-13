import { MongoClient, ObjectId } from "mongodb";
import { createPassowrd } from "../utils/passwordUtils.js";

const url = "mongodb://127.0.0.1:27017";
const dbName = "goosechat";

/**
 * Variable containg databse connection
 * 
 * @type {import('mongodb').Db} _db
 */
var _db;


export async function connectToServer(callback) {
  MongoClient.connect(url, (err, client) => {
    _db = client.db(dbName);
    console.log(_db.databaseName);
    return callback(err);
  });
}
/**
 * 
 * @returns Database connection
 */
export function getDb() {
  return _db;
}
/**
 * Seed the databse with some intial users and groups
 * 
 */
export async function seed() {
  try {
    await _db.dropDatabase();
    let usersColl = _db.collection("users");
    let groupsColl = _db.collection("groups");
    let messagesColl = _db.collection("messages");

    var _id1 = new ObjectId();
    let superAdmin = {
      _id: _id1,
      username: "superadmin",
      email: "super@goosechat.com.au",
      passHash: await createPassowrd("super"),
      imagePath: null,
      superAdmin: true,
      groupAdmin: false,
    };
    await usersColl.insertOne(superAdmin);

    var _id2 = new ObjectId();
    let newUser = {
      _id: _id2,
      username: "groupadmin",
      email: "groupadmin@goosechat.com.au",
      passHash: await createPassowrd("groupadmin"),
      imagePath: null,
      superAdmin: false,
      groupAdmin: true,
    };
    await usersColl.insertOne(newUser);

    var _id3 = new ObjectId();
    newUser = {
      _id: _id3,
      username: "assistant",
      email: "assistant@goosechat.com.au",
      passHash: await createPassowrd("assistant"),
      imagePath: null,
      superAdmin: false,
      groupAdmin: false,
    };

    await usersColl.insertOne(newUser);
    var _id4 = new ObjectId();
    newUser = {
      _id: _id4,
      username: "Joe",
      email: "joe@goosechat.com.au",
      passHash: await createPassowrd("joe"),
      imagePath: "http://localhost:3000/profileImages/image.jpg",
      superAdmin: false,
      groupAdmin: false,
    };
    await usersColl.insertOne(newUser);

    let channelId = new ObjectId();
    let newChannel = {
      _id: channelId,
      name: "Main Channel",
      users: [_id4],
    };

    let newGroup = {
      groupName: "Main Group",
      channels: [newChannel],
      description: "This is the main group right here",
      users: [_id4, _id3],
      assistants: [_id3],
    };

    await groupsColl.insertOne(newGroup);

  } catch (err) {
    console.log(err);
  }
}
