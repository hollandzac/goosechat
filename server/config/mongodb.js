import { MongoClient, ObjectId } from "mongodb";
import { createPassowrd } from "../utils/passwordUtils.js";

const url = "mongodb://127.0.0.1:27017";
const dbName = "goosechat";

/**
 * @type {import('mongodb').Db} _db
 */
var _db;

export function connectToServer(callback) {
  MongoClient.connect(url, (err, client) => {
    _db = client.db(dbName);
    console.log(_db.databaseName);
    return callback(err);
  });
}
export function getDb() {
  return _db;
}

export async function seed() {
  try {
    await _db.dropDatabase();
    let usersColl = _db.collection("users");
    let groupsColl = _db.collection("groups");
    let messagesColl = _db.collection("messages");

    var _id1 = new ObjectId();
    let superAdmin = {
      _id: _id1,
      name: "superadmin",
      email: "super@goosechat.com.au",
      passHash: await createPassowrd("super"),
      superAdmin: true,
      groupAdmin: false,
    };
    await usersColl.insertOne(superAdmin);

    var _id2 = new ObjectId();
    let newUser = {
      _id: _id2,
      name: "groupadmin",
      email: "groupadmin@goosechat.com.au",
      passHash: await createPassowrd("groupadmin"),
      superAdmin: false,
      groupAdmin: true,
    };
    await usersColl.insertOne(newUser);

    var _id3 = new ObjectId();
    newUser = {
      _id: _id3,
      name: "assistant",
      email: "assistant@goosechat.com.au",
      passHash: await createPassowrd("assistant"),
      superAdmin: false,
      groupAdmin: false,
    };

    await usersColl.insertOne(newUser);
    var _id4 = new ObjectId();
    newUser = {
      _id: _id4,
      name: "Joe",
      email: "joe@goosechat.com.au",
      passHash: await createPassowrd("joe"),
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

    let messageId = new ObjectId();
    let newMessage = {
      _id: messageId,
      channelId: channelId,
      senderId: _id4,
      message: "WOW what a message",
    };
    await messagesColl.insertOne(newMessage);

    messageId = new ObjectId();
    newMessage = {
      _id: messageId,
      channelId: channelId,
      senderId: _id2,
      message: "WOW I know",
    };

    await messagesColl.insertOne(newMessage);
  } catch (err) {
    console.log(err);
  }
}
