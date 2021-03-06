import { Strategy as localStratergy } from "passport-local";
import { getDb } from "./mongodb.js";
import { validPassword, createPassowrd } from "../utils/passwordUtils.js";

/**
 * Passort local stratergy setup
 * Use passport authenticate to verify user
 * @param {*} passport 
 */
export var passConfig = (passport) => {
  passport.use(
    new localStratergy(async (username, password, done) => {
      try {
        const users = getDb().collection("users");
        let user = await users.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const valid =  await validPassword(password, user.passHash);

        if (valid) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch (err) {
        done(err);
      }
    })
  );
};
