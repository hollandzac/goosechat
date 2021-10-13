import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import { seed, getDb, connectToServer } from "../config/mongodb.js";
import { after, before } from "mocha";
import {createPassowrd} from "../utils/passwordUtils.js";
import assert from 'assert'

let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
    let newUser
  //Drop database and reseed before each test
  beforeEach((done) => {
    done();
  });

  //Test login route
  describe("POST /login", () => {
    it("it should login and return user with correct credentials", (done) => {
      let joeUser = {
        username: "Joe",
        password: "joe",
      };
      chai
        .request(app)
        .post("/api/login")
        .send(joeUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("username");
          res.body.email.should.eq("joe@goosechat.com.au");
          done();
        });
    });
    it("should return error when incorrect creds", (done) => {
      let joeUser = {
        username: "Joe",
        password: "notjoe",
      };
      chai
        .request(app)
        .post("/api/login")
        .send(joeUser)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  describe("POST /register", () => {
    after((done) => {
      getDb().collection("users").deleteOne({ username: "newguy" });
      done();
    });
    it("should insert user into database and return new user", (done) => {
      newUser = {
        username: "newguy",
        password: "newguy",
        email: "newemail",
      };
      chai
        .request(app)
        .post("/api/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.email.should.eq("newemail");
          res.body.superAdmin.should.eq(false);
          res.body.groupAdmin.should.eq(false);
          done();
        });
    });
    it("should not insert if conflict", (done) => {
      newUser = {
        username: "newguy",
        password: "newguy",
        email: "newemail",
      };
      chai
        .request(app)
        .post("/api/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });
  describe("PUT /users/:id", () => {
      before(async function() {
        newUser = await getDb()
        .collection("users")
        .insertOne({
          username: "test",
          password: createPassowrd("test"),
          email: "testemail",
        });
        //done()
      })
   

    after((done) => {
      getDb().collection("users").deleteOne({ username: "test" });
      done();
    });
    it("should update username and password fields", (done) => {
        let update = {
            email: "testupdated",
            password: "passupdated"
        }
      chai
        .request(app)
        .put("/api/users/" + newUser.insertedId)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
  describe("POST /users/:id", () => {
      before(async function() {
        newUser = await getDb()
        .collection("users")
        .insertOne({
          username: "test",
          password: createPassowrd("test"),
          email: "testemail",
        });
        //done()
      })
   

    after((done) => {
      //getDb().collection("users").deleteOne({ username: "test" });
      done();
    });
    it("should update username and password fields", (done) => {
        let update = {
            email: "testupdated",
            password: "passupdated"
        }
      chai
        .request(app)
        .put("/api/users/" + newUser.insertedId)
        .send(update)
        .end((err, res) => {
          res.should.have.status(204);
          done()
        });
    });
  });
});
