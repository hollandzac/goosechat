import { MongoClient, ObjectId } from "mongodb";


const url = "mongodb://127.0.0.1:27017";
const dbName = "goosechat";

/**
 * @type {import('mongodb').Db} _db
 */
var _db;


export function connectToServer(callback) {
    MongoClient.connect(url,( err, client ) => {
        _db  = client.db(dbName);
        console.log(_db.databaseName)
        return callback( err );
    })
}
export function getDb() {
  return _db;
}

export async function seed(){
    await _db.dropDatabase()
    let usersColl = _db.collection('users')
    let groupsColl = _db.collection('users')
    let messagesColl = _db.collection('users')

    var _id1 = new ObjectId()
    let superAdmin = {
        _id: _id1,
        name: "superadmin",
        superAdmin: true,
        groupAdmin: true
    }
    await usersColl.insertOne(superAdmin)

    
    var _id2 = new ObjectId()
    let newUser = {
        _id: _id2,
        name: "groupadmin",
        superAdmin: false,
        groupAdmin: true,
    }
    await usersColl.insertOne(newUser)

    var _id3 = new ObjectId()
    let newUser = {
        _id: _id3,
        name: "assistant",
        superAdmin: false,
        groupAdmin: false,
    }

    await usersColl.insertOne(newUser)
    var _id4 = new ObjectId()
    let newUser = {
        _id: _id4,
        name: "Joe",
        superAdmin: false,
        groupAdmin: false,
    }
    await usersColl.insertOne(newUser)
    
    new channelId = new ObjectId()
    let newChannel = {
        _id:channelId,
        name:"Main Channel",
        users: [_id4]
    }

    let newGroup = {
        groupName:"Main Group",
        users: [_id4, _id3],
        assistants: [_id3]
    }
}