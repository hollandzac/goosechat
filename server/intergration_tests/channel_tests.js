import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import { seed, getDb, connectToServer } from "../config/mongodb.js";
import { after, before } from "mocha";
import { createPassowrd } from "../utils/passwordUtils.js";
import { ObjectId } from "mongodb";
import assert from "assert";

let should = chai.should();

chai.use(chaiHttp);

describe("Channels", function () {
  let groupsColl;
  let insertedGroup;
  let insertedChannelId;

  before(async function () {
    groupsColl = getDb().collection("groups");
    insertedChannelId = new ObjectId();

    let testGroup = {
      groupName: "Test Group",
      channels: [
        {
          _id: insertedChannelId,
          name: "Test Channel",
          users: [],
        },
      ],
      description: "Testign GRoup",
      users: [],
      assistants: [],
    };
    insertedGroup = await groupsColl.insertOne(testGroup);
    return;
  });

  after(async function () {
    //await groupsColl.deleteOne({_id: insertedGroup.insertedId})
  });

  describe("GET /groups/:id/channels", function () {
    it("it should return a list array of groups", (done) => {
      chai
        .request(app)
        .get("/api/groups/" + insertedGroup.insertedId + "/channels")
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("it should status 400 with error msg array if no channels found", (done) => {
      chai
        .request(app)
        .get("/api/groups/" + "99999999999" + "/channels")
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("POST /groups/:id/channels", function () {
    it("it should return a list array of groups", async function () {
      let newChannel = {
        _id: new ObjectId(),
        name: "New Test Channel",
        users: [],
      };
      const res = await chai
        .request(app)
        .post("/api/groups/" + insertedGroup.insertedId + "/channels")
        .send(newChannel);

      res.should.have.status(201);
      let result = await groupsColl.findOne({ _id: insertedGroup.insertedId });
      assert(result);
    });
  });

  describe("PUT /groups/:id/channels/:channelId/users", function () {
    it("it should add a user to channel", async function () {
      let username = "Joe";
      const res = await chai
        .request(app)
        .put(
          "/api/groups/" +
            insertedGroup.insertedId +
            "/channels/" +
            insertedChannelId +
            "/users"
        )
        .send({ username: username });

      res.should.have.status(200);
      let user = await getDb()
        .collection("users")
        .findOne({ username: username });
      console.log(res.body);
      assert.notStrictEqual(JSON.stringify(user._id), res.body._id)
    });
  });
});
