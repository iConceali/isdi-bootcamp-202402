import { MongoClient, ObjectId } from "mongodb";
import logic from "./index.ts";
import { expect } from "chai";
import { errors } from "com";

const { CredentialsError, NotFoundError } = errors;

describe("loginUser", () => {
  let client, users;

  before((done) => {
    client = new MongoClient("mongodb://localhost:27017");

    client
      .connect()
      .then((connection) => {
        const db = connection.db("test");

        users = db.collection("users");

        logic.users = users;

        done();
      })
      .catch(done);
  });

  it("succeeds on existing user and correct credentials", (done) => {
    users
      .deleteMany()
      .then(() => {
        users
          .insertOne({
            name: "Pepe Roni",
            birthdate: "2000-01-01",
            email: "pepe@roni.com",
            username: "peperoni",
            password: "123qwe123",
          })
          .then((result) => {
            logic.loginUser("peperoni", "123qwe123", (error, userId) => {
              if (error) {
                done(error);

                return;
              }

              try {
                expect(userId).to.be.a("string");
                expect(userId).to.equal(result.insertedId.toString());
              } catch (error) {
                done(error);
              }

              users
                .findOne({ _id: new ObjectId(userId) })
                .then((user) => {
                  try {
                    expect(user.status).to.equal("online");

                    done();
                  } catch (error) {
                    done(error);
                  }
                })
                .catch(done);
            });
          })
          .catch(done);
      })
      .catch(done);
  });

  it("fails on existing user and incorrect password", (done) => {
    users
      .deleteMany()
      .then(() => {
        users
          .insertOne({
            name: "Pepe Roni",
            birthdate: "2000-01-01",
            email: "pepe@roni.com",
            username: "peperoni",
            password: "123qwe123",
          })
          .then(() => {
            logic.loginUser("peperoni", "123qwe123qwe", (error, userId) => {
              try {
                expect(error).to.be.instanceOf(CredentialsError);
                expect(error.message).to.equal("wrong password");
                expect(userId).to.be.undefined;

                done();
              } catch (error) {
                done(error);
              }
            });
          })
          .catch(done);
      })
      .catch(done);
  });

  it("fails on existing user and incorrect username", (done) => {
    users
      .deleteMany()
      .then(() => {
        users
          .insertOne({
            name: "Pepe Roni",
            birthdate: "2000-01-01",
            email: "pepe@roni.com",
            username: "peperoni",
            password: "123qwe123",
          })
          .then(() => {
            logic.loginUser("peperoni2", "123qwe123", (error, userId) => {
              try {
                expect(error).to.be.instanceOf(NotFoundError);
                expect(error.message).to.equal("user not found");

                expect(userId).to.be.undefined;

                done();
              } catch (error) {
                done(error);
              }
            });
          })
          .catch(done);
      })
      .catch(done);
  });

  // TODO add other unhappy test cases

  after((done) => {
    client
      .close()
      .then(() => done())
      .catch(done);
  });
});
