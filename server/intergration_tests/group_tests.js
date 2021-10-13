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

describe("Groups", function () {
  let newGroup;
  let testGroup;
  //Drop database and reseed before each test
  beforeEach(async function () {
    newGroup = {
      groupName: "Test Group",
      channels: [],
      description: "This is the main group right here",
      users: [],
      assistants: [],
    };

    testGroup = await getDb().collection("groups").insertOne(newGroup);
    return;
  });
  afterEach(async () => {
    await getDb().collection("groups").deleteOne({ _id: testGroup.insertedId });
  });

  //Test all groups route
  describe("GET /groups", () => {
    it("it should return array of all groups", (done) => {
      chai
        .request(app)
        .get("/api/groups")
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].groupName.should.eql("Main Group");
          done();
        });
    });
  });
  describe("GET /groups/:id", () => {
    //console.log("ID: " + testGroup.insteredId)
    it("it should return a single group equal to test group", (done) => {
      chai
        .request(app)
        .get("/api/groups/" + testGroup.insertedId)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.groupName.should.eql("Test Group");
          done();
        });
    });
  });
  describe("POST /groups", () => {
    after((done) => {
      getDb().collection("groups").deleteOne({ groupName: "Test Group 2" });
      done();
    });
    //console.log("ID: " + testGroup.insteredId)
    it("it should add a new group", (done) => {
      newGroup.groupName = "Test Group 2";
      newGroup.description = "Test Group 2 Description";

      chai
        .request(app)
        .put("/api/groups/" + testGroup.insertedId)
        .send(newGroup)
        .end(async (err, res) => {
          res.should.have.status(201);

          let result = await getDb()
            .collection("groups")
            .findOne({ groupName: "Test Group 2" });
          assert(result);
          done();
          return;
        });
      done();
    });
    // it("it should not add group if conflict and return error", (done) => {
    //   newGroup.groupName = "Test Group 2";
    //   chai
    //     .request(app)
    //     .post("/api/groups")
    //     .send(newGroup)
    //     .end((err, res) => {
    //       res.should.have.status(409);
    //       done();
    //     });
    // });
  });

  describe("PUT /groups/:id", () => {
    after((done) => {
      getDb().collection("groups").deleteOne({ groupName: "Test Group 2" });
      done();
    });
    //console.log("ID: " + testGroup.insteredId)
    it("it should update a group", (done) => {
      newGroup.groupName = "Test Group 2";
      chai
        .request(app)
        .post("/api/groups")
        .send(newGroup)
        .end(async (err, res) => {
          res.should.have.status(204);

          let result = await getDb()
            .collection("groups")
            .findOne({ _id: new ObjectId(testGroup.insertedId) });
          assert.strictEqual(result.groupName, "");
          done();
          return;
        });
      done();
    });
  });
});
